/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRightAlt } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import { Manrope } from "next/font/google";
const manrope = Manrope({
  subsets: ["latin"],
});

const imgBase = "https://image.tmdb.org/t/p/original";

export default function MainPicture() {
  const [data, setData] = useState(new Array(10).fill(null));

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api", {
        headers: {
          path: "/trending/all/week?language=en-US",
        },
      });

      if (response.data.data && response.data.data.results) {
        setData(response.data.data.results);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="relative h-[29rem] w-full">
        <ul className="flex flex-row brightness-[0.5] h-full w-full">
          {data.slice(0, 5).map((d, i) =>
            d ? (
              <li key={i} className="relative w-1/5">
                <img
                  src={imgBase + d.backdrop_path}
                  alt={d.original_name || d.original_title || "Image"}
                  className="h-[29rem] object-cover w-full"
                  loading="lazy"
                />
              </li>
            ) : (
              <li key={i} className="w-full">
                <Skeleton height="100%" width="100%" variant="rectangular" />
              </li>
            )
          )}
        </ul>
        <div
          className={`absolute left-12 -translate-y-1/2 top-1/2 flex flex-col gap-2 text-white brightness-[1.15] ${manrope.className}`}
        >
          <div className="inline-block bg-gradient-to-br from-[#7ebe97] to-[#1782bc] text-transparent bg-clip-text text-6xl font-extrabold">
            That&apos;s a
          </div>
          <div className="inline-block bg-gradient-to-br from-[#60bac8] to-[#056bd7] text-transparent bg-clip-text text-6xl font-extrabold">
            Wrap 2024
          </div>
          <div className="text-2xl">The best of the year from TMDB.</div>
          <div>
            <button className="flex flex-row gap-1 hover:bg-white justify-center items-center group px-4 py-1 ring-2 font-semibold rounded-full ring-white duration-300 ease-in-out">
              <span className="group-hover:text-black duration-300 ease-in-out">
                Check it out
              </span>
              <span className="group-hover:text-black duration-300 ease-in-out">
                <ArrowRightAlt />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
