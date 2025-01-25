/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { Box, CircularProgress } from "@mui/joy";
import { Percent } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import { Comfortaa } from "next/font/google";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["700"],
});

const imgBase = "https://image.tmdb.org/t/p/original";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Card({ data }) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const boxRef = React.useRef(null);

  React.useEffect(() => {
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
    <Box
      ref={boxRef}
      className="scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md scrollbar-track-rounded-md bg-[url('/background.svg')]"
      sx={{
        display: "flex",
        gap: 3,
        pt: 2,
        px: 2,
        overflow: "auto",
        scrollSnapType: "x mandatory",
        "& > *": {
          scrollSnapAlign: "center",
        },
        width: "100%",
        scrollBehavior: "smooth",
        position: "relative",
      }}
    >
      {data.map((item, i) =>
        item ? (
          <a
            key={i}
            className="flex flex-col gap-4 shadow-2xl shadow-white"
            href={`/movie/${item.id}`}
          >
            <div className="relative w-[155px] hover:scale-105 duration-200 ease-in-out">
              {item.poster_path || item.backdrop_path ? (
                <img
                  src={imgBase + (item.poster_path || item.backdrop_path)}
                  alt={item.original_name || item.original_title || "Image"}
                  className="w-full h-[225px] object-cover rounded-lg brightness-90"
                  loading="lazy"
                />
              ) : null}
              <div className="absolute -bottom-5 left-3 bg-black rounded-full brightness-[1.3]">
                <CircularProgress
                  size="md"
                  thickness={3}
                  determinate
                  variant="plain"
                  value={parseInt(Math.round(item.vote_average * 10))}
                  color={
                    parseInt(Math.round(item.vote_average * 10)) < 30
                      ? "danger"
                      : parseInt(Math.round(item.vote_average * 10)) < 70
                      ? "warning"
                      : "success"
                  }
                >
                  <div className="text-white text-[14px] flex flex-row items-baseline">
                    <div className={`${comfortaa.className} font-black`}>
                      {parseInt(Math.round(item.vote_average * 10)) === 0
                        ? "NR"
                        : parseInt(Math.round(item.vote_average * 10))}
                    </div>
                    <div className="text-[7px]">
                      <Percent fontSize="inherit" />
                    </div>
                  </div>
                </CircularProgress>
              </div>
            </div>
            <div className="flex flex-col px-3 pb-4 pt-2">
              <div className="font-semibold text-[16.5px]">
                {item.name ||
                  item.title ||
                  item.original_title ||
                  item.original_name ||
                  "Movie Name"}
              </div>
              <div className="text-gray-600 text-[15px]">
                {item.release_date || item.first_air_date
                  ? (() => {
                      const d = (
                        item.release_date || item.first_air_date
                      ).split("-");
                      return `${months[d[1] - 1].slice(0, 3)} ${d[2]}, ${d[0]}`;
                    })()
                  : "Release Date"}
              </div>
            </div>
          </a>
        ) : (
          <div key={i} className="flex flex-col gap-4 relative">
            <div className="relative w-[155px] h-[225px] bg-gray-200 overflow-hidden rounded-lg">
              <Skeleton variant="rectangular" width="100%" height="100%" />
            </div>
            <div className="absolute top-[74%] left-5">
              <Skeleton width={30} height={30} variant="circular" />
            </div>
            <div className="flex flex-col px-2 gap-4">
              <Skeleton width={"70%"} height={15} variant="rounded" />
              <Skeleton width={"50%"} height={10} variant="rounded" />
            </div>
          </div>
        )
      )}
      <div
        className={`
          absolute top-0 right-0 h-full w-16
          bg-gradient-to-l from-white via-[#ffffff] to-transparent 
          pointer-events-none 
          transition-opacity duration-300 ease-in-out
          ${isScrolled ? "opacity-0" : "opacity-100"}
        `}
      ></div>
    </Box>
  );
}
