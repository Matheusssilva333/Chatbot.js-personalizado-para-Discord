const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Ensure the directory exists (redundant if folder structure is good, but safe)
const dbDir = __dirname;
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'database.sqlite');
const db = new Database(dbPath);

// Create tables (Example: Users)
db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT,
        xp INTEGER DEFAULT 0,
        level INTEGER DEFAULT 1
    )
`).run();

console.log('Banco de dados SQLite inicializado.');

module.exports = db;
