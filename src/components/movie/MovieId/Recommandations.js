/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Box } from "@mui/joy";
import { useState, useRef, useEffect } from "react";

const imgBaseUrl = "https://image.tmdb.org/t/p/original";

export default function Recommandations({ recommendations, type }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (boxRef.current) {
        setIsScrolled(boxRef.current.scrollLeft > 0);
      }
    };

    const currentRef = boxRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
      return () => currentRef.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="flex flex-col mb-10">
      <h2 className="text-2xl font-semibold pl-4">Recommandations</h2>
      <div className="relative">
        <Box
          ref={boxRef}
          className="scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md scrollbar-track-rounded-md"
          sx={{
            display: "flex",
            gap: 3,
            py: 2,
            px: 2,
            overflow: "auto",
            scrollSnapType: "x mandatory",
            "& > *": {
              scrollSnapAlign: "center",
            },
          }}
        >
          {recommendations.map((item, i) => (
            <a
              href={`/movie/${item.id}`}
              key={i}
              className="w-full flex flex-col gap-4"
            >
              <div className="w-72">
                <img
                  src={imgBaseUrl + (item.backdrop_path || item.poster_path)}
                  alt={
                    item.title ||
                    item.original_title ||
                    item.name ||
                    item.original_name
                  }
                  className="w-full h-40 object-cover rounded-lg brightness-90 ring-1 ring-gray-400 hover:shadow-xl duration-150 ease-in-out"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-row justify-between max-w-72">
                <div className="font-semibold text-[16.5px] pl-2 truncate w-[80%]">
                  {item.title ||
                    item.original_title ||
                    item.name ||
                    item.original_name}
                </div>
                <div className="">{Math.round(item.vote_average * 10)} %</div>
              </div>
            </a>
          ))}
        </Box>
        <div
          className={`
          absolute top-0 right-0 h-full w-16 
          bg-gradient-to-l from-white to-transparent 
          pointer-events-none 
          transition-opacity duration-300 ease-in-out
          ${isScrolled ? "opacity-0" : "opacity-100"}
        `}
        ></div>
      </div>
    </div>
  );
}
