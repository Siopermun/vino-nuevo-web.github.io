const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const dbPath = path.join(__dirname, 'database.sqlite');
const jsonDbPath = path.join(__dirname, 'db.json');

// Create a new database file
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error creating database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        createTables();
    }
});

function createTables() {
    db.serialize(() => {
        // Drop existing tables to start fresh
        db.run(`DROP TABLE IF EXISTS home`);
        db.run(`DROP TABLE IF EXISTS quienesSomos`);
        db.run(`DROP TABLE IF EXISTS books`);
        db.run(`DROP TABLE IF EXISTS events`);
        db.run(`DROP TABLE IF EXISTS sermons`);
        db.run(`DROP TABLE IF EXISTS movies`);
        db.run(`DROP TABLE IF EXISTS courses`);
        db.run(`DROP TABLE IF EXISTS pastors`);
        db.run(`DROP TABLE IF EXISTS galleryImages`);
        db.run(`DROP TABLE IF EXISTS users`);

        // Create tables
        db.run(`CREATE TABLE home (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            subtitle TEXT
        )`);

        db.run(`CREATE TABLE quienesSomos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            lead TEXT,
            ministryName TEXT,
            scope TEXT
        )`);

        db.run(`CREATE TABLE books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT,
            title TEXT,
            author TEXT
        )`);

        db.run(`CREATE TABLE events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            date TEXT,
            description TEXT,
            image TEXT
        )`);

        db.run(`CREATE TABLE sermons (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            preacher TEXT,
            date TEXT,
            description TEXT,
            videoUrl TEXT
        )`);

        db.run(`CREATE TABLE movies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            imageUrl TEXT,
            videoUrl TEXT
        )`);

        db.run(`CREATE TABLE courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            instructor TEXT,
            schedule TEXT,
            image TEXT
        )`);

        db.run(`CREATE TABLE pastors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            role TEXT,
            image TEXT
        )`);

        db.run(`CREATE TABLE galleryImages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            coverImage TEXT,
            images_json TEXT
        )`);

        db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            passwordHash TEXT,
            role TEXT DEFAULT 'user'
        )`, (err) => {
            if (err) {
                console.error('Error creating tables:', err.message);
            } else {
                console.log('Tables created successfully.');
                migrateData();
            }
        });
    });
}

function migrateData() {
    fs.readFile(jsonDbPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading db.json:', err);
            return;
        }

        const jsonData = JSON.parse(data);

        db.serialize(() => {
            // home
            const home = jsonData.home;
            db.run(`INSERT INTO home (title, subtitle) VALUES (?, ?)`, [home.title, home.subtitle]);

            // quienesSomos
            const quienesSomos = jsonData.quienesSomos;
            db.run(`INSERT INTO quienesSomos (title, lead, ministryName, scope) VALUES (?, ?, ?, ?)`,
                [quienesSomos.title, quienesSomos.lead, quienesSomos.ministryName, quienesSomos.scope]);

            // books
            const books = jsonData.books;
            const bookStmt = db.prepare(`INSERT INTO books (filename, title, author) VALUES (?, ?, ?)`);
            for (const book of books) {
                bookStmt.run(book.filename, book.title, book.author);
            }
            bookStmt.finalize();

            // events
            const events = jsonData.events;
            const eventStmt = db.prepare(`INSERT INTO events (title, date, description, image) VALUES (?, ?, ?, ?)`);
            for (const event of events) {
                eventStmt.run(event.title, event.date, event.description, event.image);
            }
            eventStmt.finalize();

            // sermons
            const sermons = jsonData.sermons;
            if (Array.isArray(sermons)) {
                const sermonStmt = db.prepare(`INSERT INTO sermons (title, preacher, date, description, videoUrl) VALUES (?, ?, ?, ?, ?)`);
                for (const sermon of sermons) {
                    sermonStmt.run(sermon.title, sermon.preacher, sermon.date, sermon.description, sermon.videoUrl);
                }
                sermonStmt.finalize();
            }

            // movies
            const movies = jsonData.movies;
            if (Array.isArray(movies)) {
                const movieStmt = db.prepare(`INSERT INTO movies (title, description, imageUrl, videoUrl) VALUES (?, ?, ?, ?)`);
                for (const movie of movies) {
                    movieStmt.run(movie.title, movie.description, movie.imageUrl, movie.videoUrl);
                }
                movieStmt.finalize();
            }

            // courses
            const courses = jsonData.courses;
            if (Array.isArray(courses)) {
                const courseStmt = db.prepare(`INSERT INTO courses (title, description, instructor, schedule, image) VALUES (?, ?, ?, ?, ?)`);
                for (const course of courses) {
                    courseStmt.run(course.title, course.description, course.instructor, course.schedule, course.image);
                }
                courseStmt.finalize();
            }

            // pastors
            if (Array.isArray(jsonData.pastors)) {
                const pastorStmt = db.prepare(`INSERT INTO pastors (name, role, image) VALUES (?, ?, ?)`);
                for (const pastor of jsonData.pastors) {
                    pastorStmt.run(pastor.name, pastor.role, pastor.image);
                }
                pastorStmt.finalize();
            }


            // galleryImages
            // No migration from db.json as the structure has changed significantly.
            // New gallery albums will be created via the admin panel.


            // users
            const users = jsonData.users;
            const userStmt = db.prepare(`INSERT INTO users (username, passwordHash, role) VALUES (?, ?, ?)`);
            for (const username in users) {
                userStmt.run(username, users[username].passwordHash, 'admin');
            }
            userStmt.finalize();

            console.log('Data migrated successfully.');
        });


        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Database connection closed.');
            }
        });
    });
}
