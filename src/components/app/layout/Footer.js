import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-[#032541] text-white gap-x-8 gap-y-0 flex justify-center items-center py-20 flex-col lg:flex-row">
      <div className="w-40 h-40">
        <Image
          src="/tmdb-extended-logo.svg"
          width={150}
          height={150}
          alt="tmdb-logo"
          style={{ width: "auto", height: "auto" }}
          priority
        />
      </div>
      <div className="font-semibold text-[17px] flex flex-row gap-8">
        <div className="flex flex-col gap-2 items-start">
          <button>Trending On TMDB</button>
          <button>Popular TV Shows</button>
          <button>Popular Movies</button>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <button>Comedy</button>
          <button>Thriller</button>
          <button>Adventure</button>
          <button>Horror</button>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <button>About TMDB</button>
          <button>API</button>
        </div>
      </div>
    </div>
  );
}
