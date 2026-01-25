const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database.sqlite');
const pdfsDir = path.join(__dirname, '..', 'public', 'pdfs');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database at:', dbPath);
    }
});

const parseFileName = (fileName) => {
    let baseName = fileName.replace(/\.pdf$/i, ''); // Remove .pdf extension
    // Remove numeric prefix like "123456789-" followed by optional spaces
    baseName = baseName.replace(/^\d+-\s*/, ''); 
    console.log(`Parsing: ${fileName}`); // Log parsing attempt

    // Attempt to parse "Author - Title" or "Title - Author"
    const parts = baseName.split(' - ');
    if (parts.length > 1) {
        const author = parts.pop().trim();
        const title = parts.join(' - ').trim();
        console.log(`  Parsed: Title="${title}", Author="${author}"`); // Log parsed result
        return { title, author };
    } else {
        console.log(`  Parsed: Title="${baseName}", Author="Desconocido" (no hyphen found)`); // Log parsed result
        return { title: baseName, author: 'Desconocido' };
    }
};

const seedBooks = () => {
    fs.readdir(pdfsDir, (err, files) => {
        if (err) {
            console.error('Could not list the directory.', err);
            process.exit(1);
        }

        const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');
        console.log(`Found ${pdfFiles.length} PDF files in ${pdfsDir}`); // Log number of files found

        db.serialize(() => {
            console.log('Beginning database operations...');
            db.run('DELETE FROM books', function (err) { // Use 'function' for 'this' context
                if (err) {
                    console.error('Error deleting books:', err.message);
                    return;
                }
                console.log(`Deleted ${this.changes} existing books.`); // Log how many were deleted

                console.log(`Found ${pdfFiles.length} PDF files. Inserting into database...`);
                const stmt = db.prepare('INSERT INTO books (filename, title, author) VALUES (?, ?, ?)');

                pdfFiles.forEach(file => {
                    const { title, author } = parseFileName(file);
                    const filePath = `/pdfs/${file}`;
                    console.log(`Attempting to insert: filename="${filePath}", title="${title}", author="${author}"`); // Log insertion attempt
                    stmt.run(filePath, title, author, function (err) { // Use 'function' for 'this' context
                        if (err) {
                            console.error(`Error inserting ${file}:`, err.message);
                        } else {
                            console.log(`  Successfully inserted ${file}. Row ID: ${this.lastID}`); // Log successful insertion
                        }
                    });
                });

                stmt.finalize((err) => {
                    if (err) {
                        console.error('Error finalizing statement:', err.message);
                    } else {
                        console.log('All book insertions attempted. Finalizing statement.');
                    }
                    db.close((err) => {
                        if (err) {
                            console.error('Error closing database:', err.message);
                        } else {
                            console.log('Database connection closed.');
                        }
                    });
                });
            });
        });
    });
};

seedBooks();
