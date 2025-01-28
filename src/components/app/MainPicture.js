/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRightAlt } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import { Manrope } from "next/font/google";
const manrope = Manrope({
  subsets: ["latin"],
});

export default function MainPicture() {
  return (
    <div className="flex items-center justify-center lg:mx-[4.8rem]">
      <div className="relative h-[16rem] md:h-[29rem] w-full">
        <ul className="flex flex-row brightness-[0.3] h-full w-full">
          {[1, 2, 3, 4, 5].map((d, i) => (
            <li key={i} className="relative w-1/5">
              <img
                src={`/mainpictures/${d.toString()}.webp`}
                alt="Image"
                className="h-full object-cover w-full"
                loading="lazy"
              />
            </li>
          ))}
        </ul>
        <div
          className={`absolute left-12 -translate-y-1/2 top-1/2 flex flex-col gap-2 text-white brightness-[1.15] ${manrope.className}`}
        >
          <div className="inline-block bg-gradient-to-br from-[#7ebe97] to-[#1782bc] text-transparent bg-clip-text text-5xl lg:text-6xl font-extrabold">
            That&apos;s a
          </div>
          <div className="inline-block bg-gradient-to-br from-[#60bac8] to-[#056bd7] text-transparent bg-clip-text text-5xl lg:text-6xl font-extrabold">
            Wrap 2024
          </div>
          <div className="lg:text-2xl text-[17px]">
            The best of the year from TMDB.
          </div>
          <div>
            <button className="flex flex-row gap-1 scale-75 md:scale-100 hover:bg-white justify-center items-center group px-4 py-1 ring-2 font-semibold rounded-full ring-white duration-300 ease-in-out">
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
