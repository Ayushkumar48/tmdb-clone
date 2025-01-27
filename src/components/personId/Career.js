import { Divider } from "@mui/material";
import React, { useMemo } from "react";

export default function Career({ career }) {
  const groupedCareer = useMemo(() => {
    return career.reduce((acc, item) => {
      const year = (
        item.release_date ||
        item.first_air_date ||
        "2100-01-01"
      ).split("-")[0];
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);
      return acc;
    }, {});
  }, [career]);

  const sortedYears = Object.keys(groupedCareer).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );
  return (
    <div className="rounded-lg ring-1 ring-gray-300 shadow-lg py-5 flex flex-col gap-4">
      {sortedYears.map((year, index) => {
        const items = groupedCareer[year];
        return (
          <React.Fragment key={year}>
            {index > 0 && <Divider variant="fullWidth" />}
            {items.map((item, i) => (
              <div key={i} className="flex flex-col gap-1 px-4">
                <div className="flex flex-row gap-4 text-lg">
                  <span>{year === "2100" ? "------" : year}</span>
                  <span>○</span>
                  <a
                    className="font-semibold hover:text-[#01B4E4]"
                    href={`/${item.media_type}/${item.id}`}
                  >
                    {item.title ||
                      item.original_title ||
                      item.name ||
                      item.original_name ||
                      "**movie name**"}
                  </a>
                </div>
                <div className="pl-20 text-lg">
                  <span className="text-gray-500">
                    {item.character ? "as " : "..."}
                  </span>
                  <span>{item.character ? item.character : item.job}</span>
                </div>
              </div>
            ))}
          </React.Fragment>
        );
      })}
    </div>
  );
}
