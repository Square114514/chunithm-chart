// 本页由 AI 完成

import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import readline from "readline";

/** 每行：曲名 + 难度 + 定数 + 分数 + Rating（Tab 或空格分隔均可） */
export type ChartInput = {
  title: string;
  level: string;
  constant: number;
  score: number;
  rating: number;
};

export function parseChartLine(line: string): ChartInput | null {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;

  const parts = trimmed.split(/\s+/);
  if (parts.length < 5) return null;

  const rating = Number(parts.pop());
  const score = Number(parts.pop());
  const constant = Number(parts.pop());
  const level = parts.pop()!;
  const title = parts.join(" ");

  if (!title || !level || [constant, score, rating].some(Number.isNaN)) {
    return null;
  }

  return { title, level, constant, score, rating };
}

export function parseChartText(text: string): ChartInput[] {
  const rows: ChartInput[] = [];
  for (const line of text.split(/\r?\n/)) {
    const row = parseChartLine(line);
    if (row) rows.push(row);
  }
  return rows;
}

async function readInteractive(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("请粘贴数据（每行一条），粘贴完后单独输入一行 END 并回车：");

  const lines: string[] = [];
  for await (const line of rl) {
    if (line.trim().toUpperCase() === "END") break;
    lines.push(line);
  }
  rl.close();
  return lines.join("\n");
}

async function loadInputText(): Promise<string> {
  const file = process.argv[2];
  if (file) {
    return fs.readFileSync(path.resolve(process.cwd(), file), "utf-8");
  }
  return readInteractive();
}

async function main() {
  const text = await loadInputText();
  const rows = parseChartText(text);

  if (rows.length === 0) {
    console.error(
      "未解析到有效行。格式：曲名 难度 定数 分数 Rating（空格或 Tab 均可）",
    );
    process.exit(1);
  }

  const dbPath = path.join(process.cwd(), "data", "chu.db");
  const db = new Database(dbPath);

  const insert = db.prepare(`
    INSERT INTO charts (title, level, constant, score, rating)
    VALUES (@title, @level, @constant, @score, @rating)
  `);

  const insertMany = db.transaction((list: ChartInput[]) => {
    for (const row of list) insert.run(row);
  });

  db.exec("DELETE FROM charts");
  insertMany(rows);

  console.log(`已写入 ${rows.length} 条到 ${dbPath}`);
  db.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
