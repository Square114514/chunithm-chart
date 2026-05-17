import { getDb } from "./db";
import type { ChartRow } from "../types/chart";

export function getBest30(): ChartRow[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT id, title, level, constant, score, rating
       FROM charts
       ORDER BY rating DESC
       LIMIT 30`,
    )
    .all() as ChartRow[]; // .all 执行查询，得到对象数组
}

export function getChartsSorted(
  sortBy: "rating" | "score" = "rating",
  limit = 100,
) {
  const col = sortBy === "score" ? "score" : "rating";
  const db = getDb();
  return db
    .prepare(
      `SELECT id, title, level, constant, score, rating
       FROM charts
       ORDER BY ${col} DESC
       LIMIT ?`,
    )
    .all(limit);
}
