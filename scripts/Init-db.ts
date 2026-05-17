import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "chu.db"); // process.cwd()项目根目录，path.join(...)拼成路径，
const db = new Database(dbPath); // 打开/创建 db

db.exec(`
  CREATE TABLE IF NOT EXISTS charts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    level TEXT NOT NULL,
    constant REAL NOT NULL,
    score INTEGER NOT NULL,
    rating REAL NOT NULL
  );
  // CREATE INDEX IF NOT EXISTS idx_charts_rating ON charts(rating DESC);
`);

console.log("Database Initialized:", dbPath);
db.close();
