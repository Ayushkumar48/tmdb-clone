/* eslint-disable @next/next/no-img-element */
"use client";
import { BrokenImage, KeyboardBackspace } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";

const imgBase = "https://image.tmdb.org/t/p/original";
export default function Cast({ movieId, type }) {
  const [casts, setCasts] = useState({});
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const fetchDetails = async () => {
      const response1 = await axios.get("/api", {
        headers: {
          path: `/${type}/${movieId}/credits?language=en-US`,
        },
      });
      const response2 = await axios.get("/api", {
        headers: {
          path: `/${type}/${movieId}?language=en-US`,
        },
      });
      setCasts(response1.data.data);
      setMovie(response2.data.data);
    };
    fetchDetails();
  }, [movieId, type]);
  console.log(movie, casts);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gradient-to-r from-[#103962] via-[#325579] to-[#afdbf7] py-4 sm:px-20 flex flex-row sm:gap-8">
        <div className="hidden sm:flex">
          {movie ? (
            <a href={`/${type}/${movieId}`}>
              <img
                src={imgBase + (movie.poster_path || movie.backdrop_path)}
                alt={movie.title || movie.name}
                className="rounded w-[58px] h-[87px]"
              />
            </a>
          ) : (
            <div className="rounded w-[58px] h-[87px] bg-slate-200 justify-center items-center flex">
              <BrokenImage className="opacity-60" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 justify-center text-white px-2">
          <div className="flex flex-row gap-1 sm:gap-2 justify-center items-center">
            <a className="text-3xl font-semibold" href={`/${type}/${movieId}`}>
              {movie.title ||
                movie.original_title ||
                movie.name ||
                movie.original_name}
            </a>
            <div className="text-3xl">
              {movie.release_date || movie.first_air_date
                ? `(${
                    (movie.release_date || movie.first_air_date).split("-")[0]
                  })`
                : null}
            </div>
          </div>
          <div>
            <a
              className="text-slate-300 hover:text-white"
              href={`/${type}/${movieId}`}
            >
              <span>
                <KeyboardBackspace />
              </span>{" "}
              <span>Back to main</span>
            </a>
          </div>
        </div>
      </div>
      <div className="px-2 sm:px-20 py-10 flex flex-row sm:justify-evenly">
        <div className="w-1/2">
          <h4 className="pb-8 text-2xl">
            Cast <span className="text-gray-500">{casts?.cast?.length}</span>
          </h4>
          <div className="flex flex-col gap-4">
            {casts?.cast?.map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                <div>
                  {item.profile_path ? (
                    <a href={`/person/${item.id}`}>
                      <img
                        src={imgBase + `${item.profile_path}`}
                        alt={item?.name || item?.original_name || "Person"}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </a>
                  ) : (
                    <a
                      className="w-16 h-16 bg-slate-200 rounded-lg shadow-sm flex justify-center items-center"
                      href={`/person/${item.id}`}
                    >
                      <img
                        src={
                          item.gender === 2 || item.gender === 0
                            ? "/male.svg"
                            : "/female.svg"
                        }
                        alt="person"
                      />
                    </a>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-lg font-bold">
                    <a href={`/person/${item.id}`}>
                      {item.name || item.original_name}
                    </a>
                  </div>
                  <div>{item.character || "Character"} (Episodes)</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2">
          <h4 className="pb-8 text-2xl">
            Crew <span className="text-gray-500">{casts?.crew?.length}</span>
          </h4>
          <div className="flex flex-col gap-1 sm:gap-4">
            {casts?.crew?.map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-4">
                <div>
                  {item.profile_path ? (
                    <a href={`/person/${item.id}`}>
                      <img
                        src={imgBase + `${item.profile_path}`}
                        alt={item?.name || item?.original_name || "Person"}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </a>
                  ) : (
                    <a
                      className="w-16 h-16 bg-slate-200 rounded-lg shadow-sm flex justify-center items-center"
                      href={`/person/${item.id}`}
                    >
                      <img
                        src={
                          item.gender === 2 || item.gender === 0
                            ? "/male.svg"
                            : "/female.svg"
                        }
                        alt="person"
                      />
                    </a>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-lg font-bold">
                    <a href={`/person/${item.id}`}>
                      {item.name || item.original_name}
                    </a>
                  </div>
                  <div>
                    {item.department ||
                      item.known_for_department ||
                      "Department"}{" "}
                    (Episodes)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
