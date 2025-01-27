"use client";
import Card from "@/components/movie/Card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Sort from "./Sort";
import WhereToWatch from "./WhereToWatch";
import Filters from "./Filters";

export default function Movie({ data }) {
  const [movies, setMovies] = useState(new Array(20).fill(null));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [whereToWatch, setWhereToWatch] = useState({});
  const [filters, setFilters] = useState({});
  const setData = React.useCallback((d, dType) => {
    if (dType === 1) {
      setSortBy(d);
    } else if (dType === 2) {
      setWhereToWatch((val) => ({
        ...val,
        selectedCountry: d.selectedCountry,
        selectedWatchProviders: d.selectedWatchProviders,
      }));
    } else {
      setFilters((val) => ({
        ...val,
        genreToFetch: d.genreToFetch,
        toDate: d.toDate,
        fromDate: d.fromDate,
        userScore: d.userScore,
      }));
    }
  }, []);

  const [path, setPath] = useState(
    `/${data.type}${data.path}?language=en-US&page=${page}`
  );
  function handleClick() {
    setPage(1);
    setMovies(new Array(20).fill(null));
    setPath(
      `/discover/${
        data.type
      }?include_adult=false&include_video=false&language=en-US&page=1&${
        data.type === "movie"
          ? `primary_release_date.gte=${filters.fromDate}`
          : `first_air_date.gte=${filters.fromDate}`
      }&${
        data.type === "movie"
          ? `primary_release_date.lte=${filters.toDate}`
          : `first_air_date.lte=${filters.toDate}`
      }&sort_by=${sortBy}&vote_average.gte=${filters.userScore}&watch_region=${
        whereToWatch.selectedCountry
      }&with_genres=${
        filters.genreToFetch.length > 0 ? filters.genreToFetch.join("%7C") : ""
      }&with_watch_monetization_types=flatrate%7Cfree%7Cads%7Crent%7Cbuy&with_watch_providers=${
        whereToWatch.selectedWatchProviders.length > 0
          ? whereToWatch.selectedWatchProviders.join("%7C")
          : ""
      }`
    );
  }

  useEffect(() => {
    setPath((prevPath) => {
      const updatedPath = prevPath.replace(/page=\d+/, `page=${page}`);
      return updatedPath;
    });
  }, [page]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api", { headers: { path } });

        if (isMounted) {
          setMovies((prevMovies) =>
            prevMovies[0] === null
              ? response.data.data.results
              : [...prevMovies, ...response.data.data.results]
          );
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [path, page]);

  return (
    <div className="flex flex-col gap-6 px-10 my-9">
      <h2 className="text-2xl font-[620]">{data.title}</h2>
      <div className="flex flex-row gap-10">
        <div className="flex flex-col gap-4 min-w-[23%] max-w-[23%] p-1 pb-60 sticky top-0 h-screen overflow-y-auto">
          <Sort sendSort={setData}>Sort</Sort>
          <WhereToWatch type="movie" sendWhereToWatch={setData}>
            Where To Watch
          </WhereToWatch>
          <Filters type="movie" sendFilters={setData}>
            Filters
          </Filters>
          <button
            className="bg-[#01B4E4] hover:bg-[#2191b0] duration-150 ease-in-out w-full text-white text-xl py-2 rounded-lg shadow-lg"
            onClick={handleClick}
          >
            Search
          </button>
        </div>
        {movies.length > 0 ? (
          <div className="flex-wrap flex flex-col gap-8 justify-between w-full">
            <div className="grid gap-y-8 gap-x-4 scroll-smooth w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
              {movies.map((item, i) => (
                <Card key={i} data={item} type={data.type} />
              ))}
            </div>

            <div className="flex justify-center w-full">
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
        ) : (
          <div className="text-center w-[74%]">
            <div>There is no content to show.</div>
            <div>Please refine your search and try again.</div>
          </div>
        )}
      </div>
    </div>
  );
}
