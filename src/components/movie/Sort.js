"use client";
import { ArrowForwardIos } from "@mui/icons-material";
import { Divider } from "@mui/material";
import { useState } from "react";

const list = [
  "Popularity Decending",
  "Popularity Increasing",
  "Rating Decending",
  "Rating Increasing",
  "Release Date Decreasing",
  "Release Date Increasing",
  "Title (A-Z)",
  "Title (Z-A)",
];

export default function Sort({ children }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(list[0]);
  return (
    <div className="shadow-lg rounded-md ring-1 w-full ring-gray-900/10">
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
              onChange={(e) => setSelected(e.target.value)}
            >
              {list.map((item, i) => (
                <option
                  value={item}
                  key={i}
                  className="px-2 py-1 bg-white text-black checked:bg-[#01B3E4] checked:text-white"
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null}
    </div>
  );
}
