import { NextResponse } from "next/server";
import { getBest30 } from "@/src/app/lib/charts";

export async function GET() {
  const rows = getBest30();
  return NextResponse.json(rows); // 把数组变成 JSON 响应
}
