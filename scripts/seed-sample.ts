import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.join(process.cwd(), "data", "chu.db"));

const insert = db.prepare(`
  INSERT INTO charts (title, level, constant, score, rating)
  VALUES (@title, @level, @constant, @score, @rating)
`); // 把这条 SQL 编译好存起来，后面多次插入时复用，比每次写一整条字符串更快、更安全

const sample = [
  {
    title: "Chaotic Order",
    level: "15+",
    constant: 15.6,
    score: 1008223,
    rating: 17.67,
  },
  {
    title: "DA'AT -The First Seeker of Souls-",
    level: "15+",
    constant: 15.6,
    score: 1008129,
    rating: 17.66,
  },
  // 再补几条…
];

const insertMany = db.transaction((rows) => {
  for (const row of rows) insert.run(row);
}); // 包一层事务，要么一批全部成功写入，要么出错整批回滚，避免插到一半库坏了

db.exec("DELETE FROM charts"); // 会 duplicate 数据，目前数据不多，清空再插
insertMany(sample);
console.log("Inserted", sample.length, "data");
db.close();
