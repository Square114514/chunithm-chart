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
      <h1 className="mx-auto mb-2 w-fit border-amber-600 border-b-3 text-amber-700 px-4 text-center text-2xl font-bold shadow-xl">
        Best 30
      </h1>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {list.map((row) => (
          <li
            key={row.id}
            className="bg-amber-50 rounded-md p-4 mb-1 shadow-md flex flex-col min-w-0"
          >
            <span className="text-xl font-bold text-amber-700 truncate min-w-0">
              {row.title}
            </span>
            <span className="text-lg">
              {row.level} {row.constant}
            </span>
            <span className="text-xl text-amber-900">
              {row.score} {row.rating}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
