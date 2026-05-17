import { useEffect, useState } from "react";
import { ChartRow } from "../types/chart";

export default function B30() {
  const [list, setList] = useState<ChartRow[]>([]);

  useEffect(() => {
    fetch("/api/charts")
      .then((r) => r.json())
      .then(setList);
  }, []);

  return (
    <div>
      <h1 className="text-center font-bold text-2xl">Best 30</h1>
      <ul>
        {list.map((row) => (
          <li
            key={row.id}
            className="border border-amber-100 max-w-70 rounded-md p-2 mb-2 shadow-md"
          >
            {row.title} <br />
            {row.level} {row.constant} {row.score} {row.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}
