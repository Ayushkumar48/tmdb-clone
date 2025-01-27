/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/movie/Card";

import { useSearchParams } from "next/navigation";
import axios from "axios";
import { ArrowForward } from "@mui/icons-material";

export default function Genre({ type }) {
  const genreId = useSearchParams().get("g");
  const genreName = useSearchParams().get("name");

  const [data, setData] = useState(new Array(20).fill(null));
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api", {
          headers: {
            path: `/discover/${type}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`,
          },
        });
        setData((val) =>
          val[0]
            ? [...val, ...response.data.data.results]
            : response.data.data.results
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [genreId, page, type]);
  return (
    <div className="flex-wrap flex flex-col gap-8 justify-between w-full py-10 px-10">
      <div>
        <h2 className="text-3xl font-bold">
          Genre - {genreName.split("_").join(" ")}
        </h2>
        <a href="/#genres" className="hover:opacity-60">
          See other genres <ArrowForward className="scale-75" />
        </a>
      </div>
      <div className="grid gap-y-8 gap-x-6 scroll-smooth w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
        {data.map((item, i) => (
          <Card key={i} data={item} type="movie" />
        ))}
      </div>

      <div className="flex justify-center w-full">
        <button
          className="hover:bg-[#01B4E4] hover:ring-0 px-6 py-2 rounded-lg shadow-2xl bg-sky-50 ring-1 ring-gray-500 hover:text-white text-black duration-150 ease-out font-semibold disabled:cursor-auto"
          onClick={() => {
            setLoading(true);
            setPage((prev) => prev + 1);
          }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Show more"}
        </button>
      </div>
    </div>
  );
}
