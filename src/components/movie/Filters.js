"use client";
import { ArrowForwardIos } from "@mui/icons-material";
import { Box, Divider, Slider } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Filters({ children, type, sendFilters }) {
  const [open, setOpen] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [genres, setGenres] = useState([]);
  const [userScore, setUserScore] = useState(4);
  const [showMe, setShowMe] = useState("everything");
  const [genreToFetch, setGenreToFetch] = useState([]);
  useEffect(() => {
    sendFilters({ toDate, fromDate, genreToFetch, userScore });
  }, [toDate, fromDate, genreToFetch, userScore, sendFilters]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api", {
        headers: {
          path: `/genre/${type}/list`,
        },
      });
      setGenres(response.data.data.genres);
    };
    fetchData();
  }, [type]);
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
        <div className="mb-5">
          <Divider />
          <div className="px-3 pt-2">Show Me</div>
          <div className="flex flex-col gap-1 px-3 py-2">
            <div className="flex flex-row gap-2">
              <input
                type="radio"
                name="showme"
                id="everything"
                value="everything"
                checked={showMe === "everything"}
                onChange={(e) => setShowMe(e.target.value)}
              />
              <label htmlFor="everything">Everything</label>
            </div>
            <div className="flex flex-row gap-2">
              <input
                type="radio"
                name="showme"
                id="notseen"
                value="notseen"
                checked={showMe === "notseen"}
                onChange={(e) => setShowMe(e.target.value)}
              />
              <label htmlFor="notseen">Movies I Haven&apos;t Seen</label>
            </div>
            <div className="flex flex-row gap-2">
              <input
                type="radio"
                name="showme"
                id="seen"
                value="seen"
                checked={showMe === "seen"}
                onChange={(e) => setShowMe(e.target.value)}
              />
              <label htmlFor="seen">Movies I Have Seen</label>
            </div>
          </div>
          <Divider />
          <div className="px-3 pt-2">Release Dates</div>
          <div className="px-3 py-2 flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
              <div className="text-gray-400">from</div>
              <input
                type="date"
                className="ring-1 ring-gray-300 px-2 py-1 rounded-lg shadow-sm cursor-pointer outline-none"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="text-gray-400">to</div>
              <input
                type="date"
                className="ring-1 ring-gray-300 px-2 py-1 rounded-lg shadow-sm cursor-pointer outline-none"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>
          <Divider />
          <div className="px-3 pt-2">Genres</div>
          <div className="flex flex-wrap gap-3 px-3 py-3">
            {genres.map((item, i) => (
              <button
                key={i}
                className={`py-0.5 px-2.5 rounded-full shadow ring-1 active:bg-[#1e88a6] ring-gray-400 hover:bg-[#01B4E4] hover:ring-0 hover:text-white duration-150 ease-in-out ${
                  genreToFetch.includes(item.id)
                    ? "bg-[#01B4E4] text-white"
                    : ""
                }`}
                onClick={() =>
                  setGenreToFetch((prev) =>
                    prev.includes(item.id)
                      ? prev.filter((a) => a !== item.id)
                      : [...prev, item.id]
                  )
                }
              >
                {item.name}
              </button>
            ))}
          </div>
          <Divider />
          <div className="px-3 pt-2">User Scores (0 - 10)</div>
          <div className="px-3 pt-2">
            <Box sx={{ width: "100%" }}>
              <Slider
                aria-label="User Score"
                valueLabelDisplay="auto"
                value={userScore}
                step={1}
                marks
                min={0}
                max={10}
                sx={{ color: "#01B3E4" }}
                onChange={(e) => setUserScore(e.target.value)}
              />
            </Box>
          </div>
        </div>
      ) : null}
    </div>
  );
}
