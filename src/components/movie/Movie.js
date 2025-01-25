"use client";
import Card from "@/components/movie/Card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function Movie({ data }) {
  const [movies, setMovies] = useState(new Array(20).fill(null));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api", {
        headers: {
          path: `/${data.type}${data.path}?language=en-US&page=${page}`,
        },
      });
      setMovies((prevMovies) =>
        prevMovies[0] === null
          ? response.data.data.results
          : [...prevMovies, ...response.data.data.results]
      );
      setLoading(false);
    };
    fetchData();
  }, [page, data]);

  return (
    <div className="flex flex-col gap-6 px-10 my-9">
      <h2 className="text-2xl font-[620]">{data.title}</h2>
      <div className="flex flex-row gap-10">
        <Sidebar />
        <div className="flex flex-col gap-8 justify-center w-full items-center">
          <div className="flex flex-row justify-between gap-y-8 gap-x-2 flex-wrap scroll-smooth">
            {movies.map((item, i) => (
              <Card key={i} data={item} type={data.type} />
            ))}
          </div>

          <div className="flex justify-center">
            <button
              className="hover:bg-[#01B4E4] hover:ring-0 px-6 py-2 rounded-lg shadow-2xl bg-sky-50 ring-1 ring-gray-500 hover:text-white text-black duration-150 ease-out font-semibold disabled:cursor-auto"
              onClick={() => {
                setLoading(true);
                return setPage((prev) => prev + 1);
              }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Show more"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
