/* eslint-disable @next/next/no-img-element */
import { CircularProgress } from "@mui/joy";
import { BrokenImage, Percent } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import { Comfortaa } from "next/font/google";

const comfortaa = Comfortaa({
  subsets: ["latin"],
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

export default function Card({ data, type }) {
  let d, date;
  if (data) {
    d = data.release_date
      ? data.release_date.split("-")
      : data.first_air_date
      ? data.first_air_date.split("-")
      : "";
    date =
      d === ""
        ? "Release Date"
        : `${months[d[1] - 1].slice(0, 3)} ${d[2]}, ${d[0]}`;
  }

  return (
    <>
      {data ? (
        <a
          href={`/${type}/${data.id}`}
          className="w-[185px] flex flex-col gap-4 shadow-lg rounded-lg hover:shadow-2xl duration-300 ease-in-out outline outline-1 outline-gray-300"
          title={data.original_name || data.original_title || "Title"}
        >
          <div className="relative w-full duration-200 ease-in-out">
            {data.poster_path || data.backdrop_path ? (
              <img
                src={imgBase + (data.poster_path || data.backdrop_path)}
                alt={data.original_name || data.original_title || "Image"}
                className="w-full h-[280px] object-cover rounded-t-lg brightness-90"
                loading="lazy"
              />
            ) : (
              <div className="h-[280px] w-full flex justify-center items-center">
                <BrokenImage className="scale-[3] text-gray-500" />
              </div>
            )}
            <div className="absolute -bottom-5 left-2 bg-black rounded-full brightness-[1.3]">
              <CircularProgress
                size="md"
                thickness={3}
                determinate
                variant="plain"
                className="bg-slate-900 font-bold hover:scale-110 hover:cursor-pointer duration-150 ease-in-out ring-1 ring-gray-600 ring-inset"
                value={parseInt(Math.round(data.vote_average * 10))}
                sx={{
                  "--CircularProgress-progressColor":
                    parseInt(Math.round(data.vote_average * 10)) < 30
                      ? "#DB2360"
                      : parseInt(Math.round(data.vote_average * 10)) < 70
                      ? "#D2D531"
                      : "#21D07A",
                }}
              >
                <div
                  className={`text-white text-[14px] font-bold flex flex-row ring-4 shadow-4xl ring-slate-900 ${
                    comfortaa.className
                  } ${
                    parseInt(Math.round(data.vote_average * 10)) === 0
                      ? "bg-[#666666]"
                      : parseInt(Math.round(data.vote_average * 10)) < 30
                      ? "bg-[#571435]"
                      : parseInt(Math.round(data.vote_average * 10)) < 70
                      ? "bg-[#423D0F]"
                      : "bg-[#204529]"
                  } rounded-full justify-center items-center w-full h-full`}
                >
                  <div className="relative w-[81%] h-[81%] flex justify-center items-center bg-slate-900 rounded-full ring-1 ring-slate-900 pr-[4px]">
                    {parseInt(Math.round(data.vote_average * 10)) === 0 ? (
                      "NR"
                    ) : (
                      <>
                        {parseInt(Math.round(data.vote_average * 10))}
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
              {data.name ||
                data.title ||
                data.original_title ||
                data.original_name ||
                "Movie Name"}
            </div>
            <div className="text-gray-600 text-[15px]">{date}</div>
          </div>
        </a>
      ) : (
        <div className="flex flex-col gap-4 relative">
          <div className="relative w-[185px] h-[284px] bg-gray-200 overflow-hidden rounded-lg">
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </div>
          <div className="absolute top-[76%] left-5">
            <Skeleton width={30} height={30} variant="circular" />
          </div>
          <div className="flex flex-col px-2 gap-4">
            <Skeleton width={"70%"} height={20} variant="rounded" />
            <Skeleton width={"50%"} height={15} variant="rounded" />
          </div>
        </div>
      )}
    </>
  );
}
