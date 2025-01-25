import React from "react";
import Sort from "./Sort";
import WhereToWatch from "./WhereToWatch";
import Filters from "./Filters";

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-4 w-[28%]">
      <Sort>Sort</Sort>
      <WhereToWatch type="movie">Where To Watch</WhereToWatch>
      <Filters type="movie">Filters</Filters>
      <button className="bg-[#01B4E4] hover:bg-[#2191b0] duration-150 ease-in-out w-full text-white text-xl h-12 rounded-lg shadow-lg">
        Search
      </button>
    </div>
  );
}
