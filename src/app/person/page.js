/* eslint-disable @next/next/no-img-element */
"use client";
import { Skeleton } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";

const imgBase = "https://image.tmdb.org/t/p/original";

export default function Person() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api", {
          headers: {
            path: `/person/popular?language=en-US&page=${page}`,
          },
        });
        setResponse((prev) => [...prev, ...res.data.data.results]);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [page]);
  const skeletonArray = new Array(20).fill(null);
  return (
    <div className="mx-10 py-6">
      <h1 className="text-2xl font-extrabold pb-6">Popular People</h1>
      <div className="flex flex-wrap justify-between gap-4 gap-y-8">
        {response.length > 0 ? (
          response.map((item, i) => (
            <a
              key={i}
              className="w-80 flex flex-col rounded-lg overflow-hidden ring-1 ring-gray-300 shadow-lg"
              href={"/person/" + item.id}
            >
              <div className="w-full">
                <img
                  src={imgBase + item.profile_path}
                  alt={item.name || item.original_name}
                  className="w-full h-[25rem] object-cover"
                />
              </div>
              <div className="flex flex-col gap-1 p-3">
                <div className="text-xl font-semibold">
                  {item.name || item.original_name}
                </div>
                <div>
                  {item.known_for.reduce((acc, curr, index) => {
                    const currentTitle =
                      curr.title ||
                      curr.original_title ||
                      curr.name ||
                      curr.original_name;
                    return acc + (index === 0 ? "" : ", ") + currentTitle;
                  }, "")}
                </div>
              </div>
            </a>
          ))
        ) : (
          <div className="flex flex-wrap justify-between gap-4 gap-y-8">
            {skeletonArray.map((item, i) => (
              <div key={i} className="w-80 h-[25rem] flex flex-col">
                <Skeleton variant="rounded" width={"100%"} height={"100%"} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1.5rem" }}
                  width={"40%"}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  width={"80%"}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center mt-8">
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
  );
}
