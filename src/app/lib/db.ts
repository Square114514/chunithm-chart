import Database from "better-sqlite3";
import path from "path";

let db: Database.Database | null = null; //初始null还没打开库，Database.Database 类型，表示已打开的数据库连接

export function getDb() {
  if (!db) {
    db = new Database(path.join(process.cwd(), "data", "chu.db"), {
      readonly: true, // API 只读时可加
    });
  }
  return db;
}
