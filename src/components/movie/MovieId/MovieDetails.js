/* eslint-disable @next/next/no-img-element */
import { CircularProgress } from "@mui/joy";
import {
  Bookmark,
  Favorite,
  FormatListBulleted,
  Image as ImageIcon,
  OpenWith,
  Percent,
} from "@mui/icons-material";
import { Comfortaa } from "next/font/google";
import { Info } from "@mui/icons-material";
import ModelPicture from "./ModelPicture";
import { useState } from "react";
const imgBaseUrl = "https://image.tmdb.org/t/p/original";
const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["700"],
});

export default function MovieDetails({
  movie,
  certifications,
  watchProviders,
  credits,
  type,
  images,
}) {
  credits = credits.reduce((acc, { name, job, ...rest }) => {
    const existingPerson = acc.find((person) => person.name === name);
    if (existingPerson) {
      existingPerson.jobs.push(job);
    } else {
      acc.push({ name, ...rest, jobs: [job] });
    }
    return acc;
  }, []);

  credits = credits.sort((a, b) => b.popularity - a.popularity);
  const watchProvider = {
    length:
      watchProviders?.flatrate?.length ||
      watchProviders?.buy?.length ||
      watchProviders?.rent?.length,
    provider_path:
      watchProviders?.flatrate?.[0]?.logo_path ||
      watchProviders?.buy?.[0]?.logo_path ||
      watchProviders?.rent?.[0]?.logo_path,
    link: watchProviders?.link,
    name:
      watchProviders?.flatrate?.[0]?.provider_name ||
      watchProviders?.buy?.[0]?.provider_name ||
      watchProviders?.rent?.[0]?.provider_name,
  };

  const certification =
    certifications && type === "movie"
      ? certifications.release_dates.find((item) => item.certification !== "")
      : certifications;
  const [openModel, setOpenModel] = useState(false);
  return (
    <div
      className="flex flex-col lg:flex-row lg:items-start items-center lg:pl-16 lg:pr-12 h-full gap-10 w-full relative py-10 bg-cover bg-center bg-black/50 bg-blend-overlay"
      style={
        movie.poster_path || movie.backdrop_path
          ? {
              backgroundImage: `url('${
                imgBaseUrl + (movie.backdrop_path || movie.poster_path)
              }')`,
            }
          : { backgroundColor: "#1f2937" }
      }
    >
      <div className="lg:w-[25%] lg:min-w-[18rem] w-[80%]">
        <div
          className={`h-[450px] w-full ring-1 ring-gray-300 ${
            watchProvider.length ? "rounded-t-lg" : "rounded-lg"
          }`}
        >
          {openModel ? (
            <ModelPicture setOpenModel={setOpenModel} images={images} />
          ) : null}

          {movie.poster_path || movie.backdrop_path ? (
            <button
              className="w-full h-full relative overflow-hidden group"
              onClick={() => setOpenModel(true)}
            >
              <img
                src={imgBaseUrl + (movie.poster_path || movie.backdrop_path)}
                alt="image"
                className={`w-full h-full object-cover duration-150 ease-in-out ${
                  watchProvider.length ? "rounded-t-lg" : "rounded-lg"
                } group-hover:blur group-hover:brightness-50`}
                loading="lazy"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:flex flex-row gap-2 items-center text-white text-xl z-10 duration-150 ease-in-out">
                <img src="/expand.svg" alt="expand" className="h-5 w-auto" />
                <div>Expand</div>
              </div>
            </button>
          ) : (
            <div className="h-[450px] bg-gray-300 w-[300px] rounded-lg flex justify-center items-center">
              <ImageIcon sx={{ fontSize: 120, color: "gray" }} />
            </div>
          )}
        </div>
        {watchProvider.length ? (
          <>
            <a
              className="flex flex-row gap-3 justify-center bg-[#032541] w-full text-white rounded-b-lg py-2 items-center ring-1 ring-gray-300"
              href={watchProvider.link}
              target="_blank"
            >
              <img
                src={imgBaseUrl + watchProvider.provider_path}
                alt={watchProvider.name}
                className="w-11 h-11 rounded"
              />
              <div className="flex flex-col">
                <div className="text-lg opacity-60">
                  {watchProviders.flatrate
                    ? "Now Streaming"
                    : "Available to Rent or Buy"}
                </div>
                <div className="text-lg">Watch Now</div>
              </div>
            </a>
            <div className="text-center text-white text-lg mt-1 flex flex-row gap-2 justify-center items-center">
              Powered by{" "}
              <a href="https://www.justwatch.com/" target="_blank">
                <img
                  src="/justwatchlogo.svg"
                  alt="justwatchlogo"
                  className="h-4 w-auto"
                />
              </a>
            </div>
          </>
        ) : null}
      </div>
      <div className="flex flex-col gap-5 text-white justify-center w-full lg:px-0 px-3 lg:w-auto brightness-110">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold flex gap-2">
            <span>
              {movie.title ||
                movie.origial_title ||
                movie.name ||
                movie.origial_name}
            </span>
            {movie.first_air_date || movie.release_date ? (
              <span className="font-normal text-gray-300">
                (
                {movie.first_air_date?.split("-")[0] ||
                  movie.release_date.split("-")[0]}
                )
              </span>
            ) : null}
          </h1>
          <div className="flex lg:justify-normal justify-between lg:gap-2 flex-wrap mt-1">
            <div className="sm:w-auto w-1/2 flex justify-center items-center sm:justify-start sm:items-start">
              <span className="ring-1 ring-gray-400 px-1 rounded-sm whitespace-nowrap">
                {certification?.certification || certification?.rating || "NR"}
              </span>
            </div>

            {movie.runtime ? (
              <>
                <div className="flex flex-col items-center lg:items-start lg:flex-row gap-1 sm:w-auto w-1/2">
                  <span className="text-center">
                    {movie.first_air_date?.split("-").reverse().join("/") ||
                      movie.release_date?.split("-").reverse().join("/")}
                  </span>
                  <span>
                    {certifications?.iso_3166_1
                      ? "(" + certifications.iso_3166_1 + ")"
                      : null}
                  </span>
                </div>
                <span className="hidden lg:inline">•</span>
              </>
            ) : null}
            <div className="flex flex-row justify-center text-center sm:w-auto w-1/2">
              <span>{movie.genres.map((item) => item.name).join(", ")}</span>
            </div>
            {movie.runtime ? (
              <>
                <span className="hidden lg:inline">•</span>
                <span className="sm:w-auto w-1/2 flex justify-center items-center sm:justify-start sm:items-start">{`${parseInt(
                  movie.runtime / 60
                )}h ${movie.runtime % 60}m`}</span>
              </>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex lg:gap-2 justify-around sm:justify-normal items-center flex-wrap gap-y-4">
            <div className="flex flex-row gap-4 items-center">
              <CircularProgress
                size="lg"
                thickness={5}
                determinate
                variant="plain"
                className="bg-slate-900 font-bold hover:scale-110 hover:cursor-pointer duration-150 ease-in-out ring-1 ring-gray-600 ring-inset"
                value={parseInt(Math.round(movie.vote_average * 10))}
                sx={{
                  "--CircularProgress-progressColor":
                    parseInt(Math.round(movie.vote_average * 10)) < 30
                      ? "#DB2360"
                      : parseInt(Math.round(movie.vote_average * 10)) < 70
                      ? "#D2D531"
                      : "#21D07A",
                }}
              >
                <div
                  className={`text-white text-xl font-bold flex flex-row ring-4 shadow-4xl ring-slate-900 ${
                    comfortaa.className
                  } ${
                    parseInt(Math.round(movie.vote_average * 10)) === 0
                      ? "bg-[#666666]"
                      : parseInt(Math.round(movie.vote_average * 10)) < 30
                      ? "bg-[#571435]"
                      : parseInt(Math.round(movie.vote_average * 10)) < 70
                      ? "bg-[#423D0F]"
                      : "bg-[#204529]"
                  } rounded-full justify-center items-center w-full h-full`}
                >
                  <div className="relative w-[81%] h-[81%] flex justify-center items-center bg-slate-900 rounded-full ring-1 ring-slate-900 pr-[4px]">
                    {parseInt(Math.round(movie.vote_average * 10)) === 0 ? (
                      "NR"
                    ) : (
                      <>
                        {parseInt(Math.round(movie.vote_average * 10))}
                        <div className="absolute top-[5.4px] left-[35px]">
                          <Percent sx={{ fontSize: "10px" }} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CircularProgress>
              <div className="font-bold sm:inline hidden">
                <div>User</div>
                <div>Score</div>
              </div>
            </div>
            {movie.status === "Released" ||
            new Date(movie.first_air_date) <= new Date() ? (
              <div className="text-2xl">😄😍🤯</div>
            ) : null}
            <div className="bg-[#032541] rounded-full px-4 font-bold py-2 hover:scale-105 hover:cursor-pointer duration-150 ease-in-out">
              What&apos;s your{" "}
              <span className="underline decoration-[#01B4E4] decoration-[3px]">
                Vibe
              </span>
              ?
              <Info fontSize="inherit" />
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <span
              className="bg-[#032541] p-2 rounded-full cursor-pointer relative"
              title="Add to list"
            >
              <FormatListBulleted className="scale-[0.65]" />
            </span>
            <span
              className="bg-[#032541] p-2 rounded-full cursor-pointer"
              title="Add to favorite"
            >
              <Favorite className="scale-[0.65]" />
            </span>
            <span
              className="bg-[#032541] p-2 rounded-full cursor-pointer"
              title="Add to your watchlist"
            >
              <Bookmark className="scale-[0.65]" />
            </span>
            <span className="font-extrabold hover:opacity-60 cursor-pointer">
              ► {movie.runtime ? "Play Trailer" : "Play Clip"}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg text-[#ffffffa9] italic text-justify">
            {movie.tagline}
          </h3>
          <div className="text-xl font-semibold">Overview</div>
          <div className="text-gray-200 line-clamp-6 text-justify">
            {movie.overview}
          </div>
        </div>
        <div className="flex flex-wrap gap-y-7">
          {credits.slice(0, 5).map((item, i) => (
            <div key={i} className="w-1/3 flex flex-col gap-1">
              <a
                href={`/person/${item.id}`}
                className="hover:text-[#ffffffac] font-bold"
              >
                {item.name}
              </a>

              <div className="text-sm">{item.jobs.join(", ")}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
