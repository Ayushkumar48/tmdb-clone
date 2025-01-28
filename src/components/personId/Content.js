/* eslint-disable @next/next/no-img-element */
import { ArrowForwardIos } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import React, { useState, useEffect, useRef } from "react";
import KnownFor from "./KnownFor";
import Career from "./Career";

const imgBase = "https://image.tmdb.org/t/p/original";

export default function Content({ person, credits }) {
  const [click, setClick] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const biographyRef = useRef(null);

  useEffect(() => {
    if (biographyRef.current) {
      const { scrollHeight, clientHeight } = biographyRef.current;
      setIsClamped(scrollHeight > clientHeight);
    }
  }, [person.biography]);
  const allCredits = [...(credits.crew || []), ...(credits.cast || [])];
  return (
    <div className="lg:w-[75%] w-[72%]">
      <h2 className="sm:text-[2.5rem] text-3xl text-center sm:text-left font-extrabold mb-5">
        {person.name || person.original_name}
      </h2>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 sm:gap-1">
          <div className="w-full sm:hidden px-4">
            <img
              src={imgBase + person.profile_path}
              alt={person.name}
              className="h-auto w-full rounded-lg shadow"
            />
          </div>
          <h5 className="text-2xl font-semibold">Biography</h5>
          <div
            className={`text-lg text-justify ${
              !click ? "sm:line-clamp-6 line-clamp-[10]" : ""
            }`}
            ref={biographyRef}
          >
            <ReactMarkdown>{person.biography}</ReactMarkdown>
          </div>
          {isClamped && (
            <div className="flex justify-end flex-row">
              <button
                className="text-[#01b3e4] hover:text-[#1ED5A9] flex items-center text-lg font-semibold"
                onClick={() => setClick(!click)}
              >
                {click ? "Read Less" : "Read More"}
                <ArrowForwardIos
                  sx={{
                    fontSize: 15,
                  }}
                  className={`${click ? "-rotate-90" : ""}`}
                />
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="text-2xl font-semibold">Known For</h5>
          <KnownFor
            credits={allCredits
              .sort((a, b) => b.popularity - a.popularity)
              .slice(0, 8)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="text-2xl font-semibold">
            {person.known_for_department}
          </h5>
          <Career
            career={allCredits.sort((a, b) => {
              const dateA = new Date(
                b.release_date || b.first_air_date || "1900-01-01"
              );
              const dateB = new Date(
                a.release_date || a.first_air_date || "1900-01-01"
              );
              return dateA - dateB;
            })}
          />
        </div>
      </div>
    </div>
  );
}
