require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const multer = require('multer'); // Import multer
const { exec } = require('child_process'); // Import child_process

const app = express(); // Mover la declaración de app aquí

const { body, validationResult } = require('express-validator');

const PORT = process.env.PORT || 3001;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY; // Mover estas variables
const JWT_SECRET = process.env.JWT_SECRET;         // a esta sección

console.log('YOUTUBE_API_KEY loaded:', YOUTUBE_API_KEY ? '******' : 'NOT SET');

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

const sqlite3 = require('sqlite3').verbose();
const dbPath = path.join(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Define upload directories
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
const pdfsDir = path.join(__dirname, '..', 'public', 'pdfs');

// Ensure upload directories exist
fs.existsSync(uploadsDir) || fs.mkdirSync(uploadsDir, { recursive: true });
fs.existsSync(pdfsDir) || fs.mkdirSync(pdfsDir, { recursive: true });

// Multer storage configurations
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const uploadImage = multer({
    storage: imageStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

const pdfStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, pdfsDir); // Corrected to pdfsDir
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const uploadPdf = multer({
    storage: pdfStorage,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    }
});

// Multer storage for bulk PDF uploads
const bulkPdfStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, pdfsDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const uploadBulkPdf = multer({
    storage: bulkPdfStorage,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit per file
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    }
});

// --- AUTHENTICATION ---
// Login Endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (user && await bcrypt.compare(password, user.passwordHash)) {
             const token = jwt.sign({ username: username }, JWT_SECRET, { expiresIn: '1h' });
             res.json({ token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});


// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Backend received token:', token ? 'Token present' : 'No token'); // Log token status
    if (token) {
        console.log('Backend token value:', token.substring(0, 10) + '...'); // Log first few chars
    }
    

    if (token == null) return res.status(401).json({ error: 'No authentication token provided.' });

        jwt.verify(token, JWT_SECRET, (err, user) => {

            if (err) {

                console.error('JWT verification error:', err.message); // Log JWT error details

                return res.status(403).json({ error: 'Invalid or expired token.' });

            }

            req.user = user;

            next();

        });

    };

    

    const isAdmin = (req, res, next) => {

        db.get(`SELECT role FROM users WHERE username = ?`, [req.user.username], (err, row) => {

            if (err) {

                return res.status(500).json({ error: 'Internal server error' });

            }

            if (row && row.role === 'admin') {

                next();

            } else {

                res.status(403).json({ error: 'Forbidden' });

            }

        });

    };

    

    // --- FILE UPLOAD ENDPOINTS ---

    app.post('/api/upload/image', authenticateToken, isAdmin, (req, res) => {

        uploadImage.single('file')(req, res, function (err) {

            if (err instanceof multer.MulterError) {

                // A Multer error occurred when uploading.

                return res.status(400).json({ error: err.message });

            } else if (err) {

                // An unknown error occurred when uploading.

                return res.status(500).json({ error: err.message });

            }

            // Everything went fine.

            if (!req.file) {

                return res.status(400).json({ error: 'No file uploaded.' });

            }

            res.json({ url: `/uploads/${req.file.filename}` });

        });

    });

    

            app.post('/api/upload/pdf', authenticateToken, isAdmin, (req, res) => {

    

                uploadPdf.single('file')(req, res, function (err) {

    

                    if (err instanceof multer.MulterError) {

    

                        // A Multer error occurred when uploading.

    

                        return res.status(400).json({ error: err.message });

    

                    } else if (err) {

    

                        // An unknown error occurred when uploading.

    

                        return res.status(500).json({ error: err.message });

    

                    }

    

                    // Everything went fine.

    

                    if (!req.file) {

    

                        return res.status(400).json({ error: 'No file uploaded.' });

    

                    }

    

                                res.json({ url: `/pdfs/${req.file.filename}` });

    

                    

    

                            });

    

                    

    

                        });

    

                        

    

                        app.post('/api/upload/bulk-pdfs', authenticateToken, isAdmin, uploadBulkPdf.array('files'), (req, res) => {

    

                            if (!req.files || req.files.length === 0) {

    

                                return res.status(400).json({ error: 'No files uploaded.' });

    

                            }

    

                    

    

                                                        const uploadedBooks = req.files.map(file => {

    

                    

    

                            

    

                    

    

                                                            const filename = file.filename;

    

                    

    

                            

    

                    

    

                                                            const originalname = file.originalname;

    

                    

    

                            

    

                    

    

                                                            const parts = originalname.split(/ - | \./); // Split by " - " or "."

    

                    

    

                            

    

                    

    

                                                            let title = parts[0] || 'Título Desconocido';

    

                    

    

                                                            let author = parts[1] || 'Autor Desconocido';

    

                    

    

                            

    

                    

    

                                                            // Remove numeric prefixes and trim

    

                    

    

                                                            title = title.replace(/^\d+-\s*/, '').trim();

    

                    

    

                                                            author = author.replace(/^\d+-\s*/, '').trim();

    

                    

    

                            

    

                    

    

                                                            // Clean up common file extensions if they made it into title/author

    

                    

    

                                                            title = title.replace(/\.pdf$/i, '');

    

                    

    

                                                            author = author.replace(/\.pdf$/i, '');

    

                    

    

                            

    

                    

    

                                                            return {

    

                                    filename: `/pdfs/${filename}`,

    

                                    title: title.trim(),

    

                                    author: author.trim(),

    

                                    coverImage: '', // No cover image generation for bulk for now, as decided

    

                                };

    

                            });

    

                    

    

                            res.json({ uploadedBooks });

    

                        });

    

                    

    

                        // --- CONTENT API ---

    // Endpoint to get page content (public)

    app.get('/api/content/:page', (req, res) => {
        const { page } = req.params;
        const { page: pageNum = 1, limit = 20, all } = req.query; // Add 'all'
        const offset = (parseInt(pageNum, 10) - 1) * parseInt(limit, 10);

        console.log(`[Backend] /api/content/${page} requested. all: ${all}, pageNum: ${pageNum}, limit: ${limit}`);

        const validTables = ['home', 'quienesSomos', 'books', 'events', 'sermons', 'movies', 'courses', 'pastors', 'galleryImages'];
        if (!validTables.includes(page)) {
            console.warn(`[Backend] Invalid page name requested: ${page}`);
            return res.status(400).json({ error: 'Invalid page name.' });
        }

        if (page === 'home' || page === 'quienesSomos') {
            db.get(`SELECT * FROM ${page}`, (err, row) => {
                if (err) {
                    console.error(`[Backend] Error fetching content for ${page}:`, err.message);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                console.log(`[Backend] Fetched 1 row for ${page}.`);
                res.json(row || {});
            });
        } else {
            const countQuery = `SELECT COUNT(*) AS count FROM ${page}`;
            db.get(countQuery, (err, countRow) => {
                if (err) {
                    console.error(`[Backend] Error counting items for ${page}:`, err.message);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                const total = countRow.count;
                let query = `SELECT * FROM ${page}`; // Base query

                const queryParams = [];
                if (all !== 'true') { // Apply LIMIT and OFFSET only if 'all' is not true
                    query += ` LIMIT ? OFFSET ?`;
                    queryParams.push(limit, offset);
                    console.log(`[Backend] Paginated query for ${page}: ${query} with params ${queryParams}`);
                } else {
                    console.log(`[Backend] Full query for ${page}: ${query}`);
                }

                db.all(query, queryParams, (err, rows) => { // Pass queryParams
                    if (err) {
                        console.error(`[Backend] Error executing query for ${page}:`, err.message);
                        return res.status(500).json({ error: 'Internal server error' });
                    }

                    let results = rows || [];
                    if (page === 'galleryImages') {
                        results = rows.map(row => ({
                            ...row,
                            images: JSON.parse(row.images_json)
                        }));
                    }
                    
                    console.log(`[Backend] Fetched ${results.length} rows for ${page}.`);
                    if (all === 'true') { // Return a plain array for 'all' requests
                        res.json(results);
                    } else { // Return paginated object for normal requests
                        res.json({
                            total,
                            page: parseInt(pageNum, 10),
                            limit: parseInt(limit, 10),
                            data: results
                        });
                    }
                });
            });
        }
    });

    

    const validatePage = (req, res, next) => {

        const page = req.params.page;

        const validations = {

            home: [

                body('title').notEmpty().withMessage('Title is required'),

                body('subtitle').notEmpty().withMessage('Subtitle is required'),

            ],

            quienesSomos: [

                body('title').notEmpty().withMessage('Title is required'),

                body('lead').notEmpty().withMessage('Lead is required'),

                body('ministryName').notEmpty().withMessage('Ministry name is required'),

                body('scope').notEmpty().withMessage('Scope is required'),

            ],

            books: [

                body().isArray().withMessage('Books should be an array'),

                body('*.title').notEmpty().withMessage('Book title is required'),

                body('*.author').notEmpty().withMessage('Book author is required'),

            ],

            events: [

                body().isArray().withMessage('Events should be an array'),

                body('*.title').notEmpty().withMessage('Event title is required'),

                body('*.date').notEmpty().withMessage('Event date is required'),

                body('*.description').notEmpty().withMessage('Event description is required'),

            ],

            sermons: [

                body().isArray().withMessage('Sermons should be an array'),

                body('*.title').notEmpty().withMessage('Sermon title is required'),

                body('*.preacher').notEmpty().withMessage('Sermon preacher is required'),

                body('*.date').notEmpty().withMessage('Sermon date is required'),

                body('*.videoUrl').notEmpty().isURL().withMessage('Sermon video URL is required'),

            ],

            movies: [

                body().isArray().withMessage('Movies should be an array'),

                body('*.title').notEmpty().withMessage('Movie title is required'),

                body('*.description').notEmpty().withMessage('Movie description is required'),

                body('*.videoUrl').notEmpty().isURL().withMessage('Movie video URL is required'),

            ],

            courses: [

                body().isArray().withMessage('Courses should be an array'),

                body('*.title').notEmpty().withMessage('Course title is required'),

                body('*.description').notEmpty().withMessage('Course description is required'),

                body('*.instructor').notEmpty().withMessage('Course instructor is required'),

                body('*.schedule').notEmpty().withMessage('Course schedule is required'),

            ],

            pastors: [

                body().isArray().withMessage('Pastors should be an array'),

                body('*.name').notEmpty().withMessage('Pastor name is required'),

                body('*.role').notEmpty().withMessage('Pastor role is required'),

            ],

                        galleryImages: [

                            body().isArray().withMessage('Gallery albums should be an array'),

                            body('*.title').notEmpty().withMessage('Album title is required'),

                            body('*.description').notEmpty().withMessage('Album description is required'),

                            body('*.coverImage').notEmpty().withMessage('Album cover image is required'),

                            body('*.images').isArray().withMessage('Album images should be an array'),

                        ],

        };

    

        const validationChain = validations[page];

        if (!validationChain) {

            return next();

        }

    

        Promise.all(validationChain.map(validation => validation.run(req))).then(() => {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {

                return res.status(400).json({ errors: errors.array() });

            }

            next();

        });

    };

    

    // Endpoint to update page content (protected)

    app.post('/api/content/:page', authenticateToken, isAdmin, validatePage, (req, res) => {

        const { page } = req.params;

        const newContent = req.body;

    console.log(`Backend received POST for page: ${page}`); // Nuevo log
    if (page === 'galleryImages') {
        console.log('Received newContent for galleryImages:', JSON.stringify(newContent, null, 2)); // Nuevo log específico
    }

    

        const validTables = ['home', 'quienesSomos', 'books', 'events', 'sermons', 'movies', 'courses', 'pastors', 'galleryImages'];

        if (!validTables.includes(page)) {

            return res.status(400).json({ error: 'Invalid page name.' });

        }

    

    db.serialize(() => {
        db.run(`DELETE FROM ${page}`);
        
        if (page === 'home') {
            const stmt = db.prepare(`INSERT INTO home (title, subtitle) VALUES (?, ?)`);
            stmt.run(newContent.title, newContent.subtitle);
            stmt.finalize();
        } else if (page === 'quienesSomos') {
            const stmt = db.prepare(`INSERT INTO quienesSomos (title, lead, ministryName, scope) VALUES (?, ?, ?, ?)`);
            stmt.run(newContent.title, newContent.lead, newContent.ministryName, newContent.scope);
            stmt.finalize();
        } else if (page === 'books') {
            const stmt = db.prepare(`INSERT INTO books (filename, title, author, coverImage) VALUES (?, ?, ?, ?)`);
            for (const item of newContent) {
                stmt.run(item.filename, item.title, item.author, item.coverImage);
            }
            stmt.finalize();
        } else if (page === 'events') {
            const stmt = db.prepare(`INSERT INTO events (title, date, description, image) VALUES (?, ?, ?, ?)`);
            for (const item of newContent) {
                stmt.run(item.title, item.date, item.description, item.image);
            }
            stmt.finalize();
        } else if (page === 'sermons') {
            const stmt = db.prepare(`INSERT INTO sermons (title, preacher, date, description, videoUrl) VALUES (?, ?, ?, ?, ?)`);
            for (const item of newContent) {
                stmt.run(item.title, item.preacher, item.date, item.description, item.videoUrl);
            }
            stmt.finalize();
        } else if (page === 'movies') {
            const stmt = db.prepare(`INSERT INTO movies (title, description, imageUrl, videoUrl) VALUES (?, ?, ?, ?)`);
            for (const item of newContent) {
                stmt.run(item.title, item.description, item.imageUrl, item.videoUrl);
            }
            stmt.finalize();
        } else if (page === 'courses') {
            const stmt = db.prepare(`INSERT INTO courses (title, description, instructor, schedule, image) VALUES (?, ?, ?, ?, ?)`);
            for (const item of newContent) {
                stmt.run(item.title, item.description, item.instructor, item.schedule, item.image);
            }
            stmt.finalize();
        } else if (page === 'pastors') {
            const stmt = db.prepare(`INSERT INTO pastors (name, role, image) VALUES (?, ?, ?)`);
            for (const item of newContent) {
                stmt.run(item.name, item.role, item.image);
            }
            stmt.finalize();
        } else if (page === 'galleryImages') {
            const stmt = db.prepare(`INSERT INTO galleryImages (title, description, coverImage, images_json) VALUES (?, ?, ?, ?)`);
            for (const item of newContent) {
                stmt.run(item.title, item.description, item.coverImage, JSON.stringify(item.images)); // images array to JSON string
            }
            stmt.finalize();
        }

        res.json(newContent);
    });
});


// --- PROXY APIS ---

// Endpoint to proxy YouTube API requests
app.get('/api/youtube-search', async (req, res) => {
    const { query, pageToken } = req.query;

    if (!YOUTUBE_API_KEY) {
        return res.status(500).json({ error: 'YouTube API Key not configured on the server.' });
    }
    if (!query) {
        return res.status(400).json({ error: 'Search query is required.' });
    }

    const maxResults = 12;
    let youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`;
    
    if (pageToken) {
        youtubeApiUrl += `&pageToken=${pageToken}`;
    }

    try {
        const youtubeResponse = await fetch(youtubeApiUrl);
        if (!youtubeResponse.ok) {
            const errorData = await youtubeResponse.json();
            return res.status(youtubeResponse.status).json(errorData);
        }
        const data = await youtubeResponse.json();
        res.json(data);
    } catch (error) {
        console.error('Error proxying YouTube API request:', error);
        res.status(500).json({ error: 'Failed to fetch videos from YouTube.' });
    }
});

// Endpoint to proxy Spanish Bible API requests
app.get('/api/bible', async (req, res) => {
    const { book, chapter, verse } = req.query;

    if (!book || !chapter) {
        return res.status(400).json({ error: 'Book and chapter are required.' });
    }

    let bibleApiUrl = `https://ajphchgh0i.execute-api.us-west-2.amazonaws.com/dev/api/bible/json?book=${encodeURIComponent(book)}&chapter=${encodeURIComponent(chapter)}`;
    
    if (verse) {
        bibleApiUrl += `&verse=${encodeURIComponent(verse)}`;
    }

    try {
        const bibleResponse = await fetch(bibleApiUrl);
        if (!bibleResponse.ok) {
            const errorData = await bibleResponse.json();
            return res.status(bibleResponse.status).json(errorData);
        }
        const data = await bibleResponse.json();
        res.json(data);
    } catch (error) {
        console.error('Error proxying Bible API request:', error);
        res.status(500).json({ error: 'Failed to fetch Bible text.' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
});