/* eslint-disable @next/next/no-img-element */
import ImageIcon from "@mui/icons-material/Image";
import React from "react";

const imgBaseUrl = "https://image.tmdb.org/t/p/original";
export default function Seasons({ movie }) {
  const currentSeason = movie.seasons.find(
    (item) => item?.season_number === movie?.last_episode_to_air.season_number
  );

  return (
    <div className="flex flex-col lg:pl-4 gap-4">
      <h2 className="text-2xl pl-4 lg:pl-0 font-semibold">
        {movie?.in_production ? "Current" : "Last"} Season
      </h2>
      <div className="lg:flex lg:flex-row ring-1 ring-gray-300 rounded-lg shadow-xl hidden">
        <div>
          {currentSeason.poster_path ||
          movie.backdrop_path ||
          movie.poster_path ? (
            <img
              src={
                imgBaseUrl +
                (currentSeason.poster_path ||
                  movie.backdrop_path ||
                  movie.poster_path)
              }
              alt={movie.name}
              className="h-full w-48 rounded-l-lg"
            />
          ) : (
            <div className="h-full w-48 rounded-l-lg bg-slate-300 flex justify-center items-center">
              <ImageIcon className="scale-[2.5]" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-6 justify-center pl-6 pr-16 py-4 text-[17px]">
          <div className="flex flex-col gap-1">
            <h4 className="text-[25px] font-semibold">{currentSeason.name}</h4>
            <div className="flex flex-row gap-2">
              {currentSeason.vote_average ? (
                <span className="bg-[#032541] px-2 py-[0.6px] rounded-lg text-white font-semibold">
                  ★ {Math.round(currentSeason.vote_average * 10)}{" "}
                  <span className="text-[10px]">%</span>
                </span>
              ) : null}
              <span>{currentSeason.air_date.split("-")[0]}</span>
              <span className="font-extrabold">·</span>
              <span>{currentSeason.episode_count} Episodes</span>
            </div>
          </div>
          <div>
            {currentSeason.overview && currentSeason.overview !== ""
              ? currentSeason.overview
              : `${currentSeason.name} of ${
                  movie.name || movie.original_name
                } premiered on ${new Date(
                  currentSeason.air_date
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}`}
          </div>
          <div className="flex flex-row gap-2 items-center">
            <span>
              <img src="/calender.svg" alt="calender" className="w-6 h-auto" />
            </span>
            <span className="underline">
              <a href="#">{movie.last_episode_to_air.name || ""}</a>
            </span>
            <span>
              ({currentSeason.season_number}X
              {movie.last_episode_to_air.episode_number},{" "}
              {new Date(movie.last_episode_to_air.air_date).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
              )
            </span>
            {!(movie.last_episode_to_air.episode_type === "standard") ? (
              <span className="bg-[#032541] px-2 py-[0.6px] rounded-lg text-white">
                Season{" "}
                {movie.last_episode_to_air.episode_type
                  .slice(0, 1)
                  .toUpperCase() +
                  movie.last_episode_to_air.episode_type.slice(1)}
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex flex-row ring-1 ring-gray-300 rounded-lg shadow-xl lg:hidden">
        <div className="flex flex-col gap-6 justify-center px-4 py-4 text-[17px]">
          <div className="flex flex-col gap-1">
            <h4 className="text-[25px] font-semibold">{currentSeason.name}</h4>
            <div className="flex flex-row gap-2">
              {currentSeason?.vote_average ? (
                <span className="bg-[#032541] px-2 py-[0.6px] rounded-lg text-white font-semibold">
                  ★ {Math.round(currentSeason.vote_average * 10)}{" "}
                  <span className="text-[10px]">%</span>
                </span>
              ) : null}
              <span>{currentSeason?.air_date?.split("-")[0]}</span>
              <span className="font-extrabold">·</span>
              <span>{currentSeason?.episode_count || "0"} Episodes</span>
            </div>
          </div>
          <div className="flex flex-row gap-2 w-full">
            <div className="w-full h-full">
              {currentSeason?.poster_path ||
              movie?.backdrop_path ||
              movie?.poster_path ? (
                <img
                  src={
                    imgBaseUrl +
                    (currentSeason.poster_path ||
                      movie.backdrop_path ||
                      movie.poster_path)
                  }
                  alt={movie?.name || "movie poster"}
                  className="h-auto w-full rounded-lg"
                />
              ) : (
                <div className="h-full w-full rounded-lg bg-slate-300 flex justify-center items-center">
                  <ImageIcon className="scale-[1.5]" />
                </div>
              )}
            </div>
            <div className="text-justify">
              {currentSeason.overview && currentSeason.overview !== ""
                ? currentSeason.overview
                : `${currentSeason.name} of ${
                    movie.name || movie.original_name
                  } premiered on ${new Date(
                    currentSeason.air_date
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}`}
            </div>
          </div>
          <div className="flex flex-row gap-1 justify-between items-center">
            <div className="flex flex-col gap-1 justify-center items-center">
              <span>
                <img
                  src="/calender.svg"
                  alt="calender"
                  className="w-6 h-auto"
                />
              </span>
              <span className="underline">
                <a href="#">
                  {movie?.last_episode_to_air?.name || "Episode Name"}
                </a>
              </span>
            </div>
            <div className="flex flex-col gap-1 justify-center items-center">
              <span>
                ({currentSeason?.season_number || "Season No."}X
                {movie?.last_episode_to_air?.episode_number ||
                  "No. of Episodes"}
                )
              </span>

              <span>
                {new Date(
                  movie?.last_episode_to_air?.air_date
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }) || "Last Episode Air Date"}
              </span>
            </div>
            {!(movie?.last_episode_to_air?.episode_type === "standard") ? (
              <span className="bg-[#032541] px-2 py-[0.6px] rounded-lg text-white">
                Season{" "}
                {movie?.last_episode_to_air?.episode_type
                  .slice(0, 1)
                  .toUpperCase() +
                  movie?.last_episode_to_air?.episode_type.slice(1)}
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <div className="mt-3">
        <a href="#" className="text-xl hover:opacity-60 font-semibold">
          View All Seasons
        </a>
      </div>
    </div>
  );
}
