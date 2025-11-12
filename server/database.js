import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, 'cv-database.db'));

// Initialize database tables
export function initDatabase() {
  // Users table (simple identification)
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // CVs table
  db.exec(`
    CREATE TABLE IF NOT EXISTS cvs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      version_name TEXT NOT NULL,
      data TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  console.log('Database initialized successfully');
}

// User operations
export const userOps = {
  create: (id, username) => {
    const stmt = db.prepare('INSERT INTO users (id, username) VALUES (?, ?)');
    return stmt.run(id, username);
  },

  findByUsername: (username) => {
    const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
    return stmt.get(username);
  },

  findById: (id) => {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id);
  }
};

// CV operations
export const cvOps = {
  getAllByUser: (userId) => {
    const stmt = db.prepare('SELECT * FROM cvs WHERE user_id = ? ORDER BY updated_at DESC');
    return stmt.all(userId);
  },

  getById: (cvId, userId) => {
    const stmt = db.prepare('SELECT * FROM cvs WHERE id = ? AND user_id = ?');
    return stmt.get(cvId, userId);
  },

  create: (cv, userId) => {
    const stmt = db.prepare(`
      INSERT INTO cvs (id, user_id, version_name, data, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    `);
    return stmt.run(cv.id, userId, cv.versionName || 'Untitled', JSON.stringify(cv));
  },

  update: (cv, userId) => {
    const stmt = db.prepare(`
      UPDATE cvs
      SET version_name = ?, data = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?
    `);
    return stmt.run(cv.versionName || 'Untitled', JSON.stringify(cv), cv.id, userId);
  },

  delete: (cvId, userId) => {
    const stmt = db.prepare('DELETE FROM cvs WHERE id = ? AND user_id = ?');
    return stmt.run(cvId, userId);
  },

  deleteAll: (userId) => {
    const stmt = db.prepare('DELETE FROM cvs WHERE user_id = ?');
    return stmt.run(userId);
  }
};

export default db;
