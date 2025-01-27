/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { Box, CircularProgress } from "@mui/joy";
import { BrokenImage, Percent } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import { Comfortaa } from "next/font/google";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["700"],
});

const imgBase = "https://image.tmdb.org/t/p/original";

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
              ) : (
                <div className="w-full h-[225px] flex flex-col gap-5 text-sm justify-center items-center bg-gray-200 rounded-lg">
                  <BrokenImage className="scale-[2.5]" />
                  Image not avaliable
                </div>
              )}
              <div className="absolute -bottom-5 left-3 bg-black rounded-full brightness-[1.3]">
                <CircularProgress
                  size="md"
                  thickness={3}
                  determinate
                  variant="plain"
                  className="bg-slate-900 font-bold hover:scale-110 hover:cursor-pointer duration-150 ease-in-out ring-1 ring-gray-600 ring-inset"
                  value={parseInt(Math.round(item.vote_average * 10))}
                  sx={{
                    "--CircularProgress-progressColor":
                      parseInt(Math.round(item.vote_average * 10)) < 30
                        ? "#DB2360"
                        : parseInt(Math.round(item.vote_average * 10)) < 70
                        ? "#D2D531"
                        : "#21D07A",
                  }}
                >
                  <div
                    className={`text-white text-[14px] font-bold flex flex-row ring-4 shadow-4xl ring-slate-900 ${
                      comfortaa.className
                    } ${
                      parseInt(Math.round(item.vote_average * 10)) === 0
                        ? "bg-[#666666]"
                        : parseInt(Math.round(item.vote_average * 10)) < 30
                        ? "bg-[#571435]"
                        : parseInt(Math.round(item.vote_average * 10)) < 70
                        ? "bg-[#423D0F]"
                        : "bg-[#204529]"
                    } rounded-full justify-center items-center w-full h-full`}
                  >
                    <div className="relative w-[81%] h-[81%] flex justify-center items-center bg-slate-900 rounded-full ring-1 ring-slate-900 pr-[4px]">
                      {parseInt(Math.round(item.vote_average * 10)) === 0 ? (
                        "NR"
                      ) : (
                        <>
                          {parseInt(Math.round(item.vote_average * 10))}
                          <div className="absolute top-[0.75px] left-[22px]">
                            <Percent sx={{ fontSize: "6px" }} />
                          </div>
                        </>
                      )}
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
                  ? new Date(item.release_date || item.first_air_date)
                      .toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                      .split("T")[0]
                  : "Not Released Yet"}
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
