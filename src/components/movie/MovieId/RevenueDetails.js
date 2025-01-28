"use client";
/* eslint-disable @next/next/no-img-element */
import { Facebook, Instagram, Link, Twitter } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const imgBaseUrl = "https://image.tmdb.org/t/p/original";

export default function RevenueDetails({ movie, keywords, type }) {
  const movieId = movie.id;
  const [socialMedia, setSocialMedia] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api", {
        headers: {
          path: `/${type}/${movieId}/external_ids`,
        },
      });
      setSocialMedia(response.data.data);
    };
    fetchData();
  }, [movieId, type]);

  return (
    <div className="lg:mt-12 lg:flex lg:flex-col flex flex-col-reverse">
      <div className="flex flex-row gap-4 mb-4 justify-center items-center">
        {socialMedia?.instagram_id ? (
          <a
            href={`https://instagram.com/${socialMedia.twitter_id}`}
            target="_blank"
            className="w-10 h-10"
          >
            <Instagram />
          </a>
        ) : null}
        {socialMedia?.twitter_id ? (
          <a
            href={`https://twitter.com/${socialMedia.twitter_id}`}
            target="_blank"
            className="w-10 h-10"
          >
            <Twitter />
          </a>
        ) : null}
        {socialMedia?.facebook_id ? (
          <a
            href={`https://www.facebook.com/${socialMedia.facebook_id}`}
            target="_blank"
            className="w-10 h-10"
          >
            <Facebook />
          </a>
        ) : null}
        {socialMedia?.wikidata_id ? (
          <a
            href={`https://www.wikidata.org/wiki/${socialMedia.wikidata_id}`}
            className="w-10 h-10"
            target="_blank"
          >
            <img src="/wikidata.png" className="w-full h-auto" alt="wikidata" />
          </a>
        ) : null}
        {movie.homepage && movie.homepage !== "" ? (
          <a href={movie.homepage} target="_blank" className="w-10 h-10">
            <Link />
          </a>
        ) : null}
      </div>
      <div className="flex flex-col gap-1 pl-2 lg:pl-0">
        <div className="text-xl mb-2 font-bold">Facts</div>
        <div className="flex flex-col gap-3 mb-4 lg:mb-0 lg:gap-6">
          <div className="flex flex-col">
            <div className="text-lg font-semibold">
              Original {type === "tv" ? "Name" : "Title"}
            </div>
            <div className="text-lg">
              {movie.original_title || movie.original_name}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-lg font-semibold">Status</div>
            <div className="text-lg">{movie.status}</div>
          </div>

          {movie.budget ? (
            <div className="flex flex-col">
              <div className="text-lg font-semibold">Budget</div>
              <div className="text-lg">
                {movie.budget === 0
                  ? "-"
                  : "$" + movie.budget.toLocaleString() + ".00"}
              </div>
            </div>
          ) : null}
          {movie.revenue ? (
            <div className="flex flex-col">
              <div className="text-lg font-semibold">Revenue</div>
              <div className="text-lg">
                {movie.revenue === 0
                  ? "-"
                  : "$" + movie.revenue.toLocaleString() + ".00"}
              </div>
            </div>
          ) : null}
          {movie.networks ? (
            <div className="flex flex-col gap-1">
              <div className="text-lg font-semibold">Networks</div>
              <div className="flex flex-col gap-2">
                {movie.networks.map((item, i) => (
                  <a href="#" key={i}>
                    {item.logo_path ? (
                      <img
                        src={imgBaseUrl + item.logo_path}
                        alt={item.name}
                        className="w-[7.5rem] h-auto"
                      />
                    ) : (
                      <div className="hover:text-gray-400 font-semibold underline">
                        {item.name}
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
          {movie.type ? (
            <div className="flex flex-col">
              <div className="text-lg font-semibold">Type</div>
              <div className="text-lg">{movie.type}</div>
            </div>
          ) : null}
          {movie.original_language ? (
            <div className="flex flex-col">
              <div className="text-lg font-semibold">Original Language</div>
              <div className="text-lg">
                {new Intl.DisplayNames(["en"], { type: "language" }).of(
                  movie.original_language
                )}
              </div>
            </div>
          ) : null}
          <div className="flex flex-col gap-1">
            <div className="text-xl font-semibold">Keywords</div>
            {keywords[0] ? (
              <div className="flex flex-wrap gap-2">
                {keywords.slice(0, 20).map((item, i) => (
                  <a href="#" key={i}>
                    <div className="bg-[#E5E5E5] px-2 rounded-sm ring-[0.5px] ring-slate-400 text-center">
                      {item.name}
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div>No keywords have been added.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
