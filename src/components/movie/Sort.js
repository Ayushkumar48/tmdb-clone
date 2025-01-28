"use client";
import { ArrowForwardIos } from "@mui/icons-material";
import { Divider } from "@mui/material";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sort({ children, sendSort }) {
  const path = usePathname().split("/")[1];

  const movie = [
    "popularity.desc",
    "popularity.asc",
    "vote_average.desc",
    "vote_average.asc",
    "primary_release_date.desc",
    "primary_release_date.asc",
    "title.desc",
    "title.asc",
  ];
  const tv = [
    "popularity.desc",
    "popularity.asc",
    "vote_average.desc",
    "vote_average.asc",
    "first_air_date.desc",
    "first_air_date.asc",
    "name.desc",
    "name.asc",
  ];
  const list = path === "movie" ? movie : tv;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(list[0]);
  return (
    <div className="shadow-sm rounded-md ring-1 w-full ring-gray-900/10">
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-3 flex flex-row justify-between w-full"
      >
        <div className="text-xl font-semibold">{children}</div>
        <div className={`${open ? "rotate-90" : ""}`}>
          <ArrowForwardIos sx={{ height: 15 }} />
        </div>
      </button>
      {open ? (
        <div>
          <Divider />
          <div className="px-3 py-2 flex flex-col gap-2">
            <div>Sort Results by</div>
            <select
              className="hover:cursor-pointer bg-slate-300 px-2 py-1.5 rounded-lg shadow ring-inset ring-1 ring-gray-400 hover:ring-0 hover:bg-slate-200 duration-150 ease-in-out outline-none"
              name="data"
              value={selected}
              onChange={(e) => {
                setSelected(e.target.value);
                sendSort(e.target.value, 1);
              }}
            >
              {list.map((item, i) => (
                <option
                  value={item}
                  key={i}
                  className="px-2 py-1 bg-white text-black checked:bg-[#01B3E4] checked:text-white"
                >
                  {item.split(".")[0] === "vote_average"
                    ? "Rating"
                    : item
                        .split(".")[0]
                        .split("_")
                        .map((d) => d[0].toUpperCase() + d.slice(1))
                        .join(" ")}{" "}
                  {item.split(".")[1] === "asc" ? "Ascending" : "Descending"}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null}
    </div>
  );
}
