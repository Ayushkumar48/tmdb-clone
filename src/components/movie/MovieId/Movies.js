/* eslint-disable @next/next/no-img-element */
"use client";
import Cast from "@/components/movie/MovieId/Cast";
import MovieDetails from "@/components/movie/MovieId/MovieDetails";
import Recommandations from "@/components/movie/MovieId/Recommandations";
import RevenueDetails from "@/components/movie/MovieId/RevenueDetails";
import Review from "@/components/movie/MovieId/Review";
import { Divider } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieSkeleton from "@/components/movie/MovieId/MovieSkeleton";
import Seasons from "@/components/tvId/Seasons";

const imgBaseUrl = "https://image.tmdb.org/t/p/original";

export default function MovieId({ id, type }) {
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const paths = [
          `/${type}/${id}?language=en-US`,
          `/${type}/${id}/${
            type === "movie" ? "release_dates" : "content_ratings"
          }?language=en-US`,
          `/${type}/${id}/credits?language=en-US`,
          `/${type}/${id}/reviews?language=en-US&page=1`,
          `/${type}/${id}/recommendations?language=en-US&page=1`,
          `/${type}/${id}/images`,
          `/${type}/${id}/watch/providers`,
          `/${type}/${id}/keywords`,
        ];

        const response = await axios.post("/api", {
          paths,
          type,
        });
        const combinedData = response.data.data;

        setMovieData(combinedData);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [id, type]);

  console.log(movieData);
  return movieData ? (
    <div className="flex flex-col gap-8 w-full">
      <div className="w-full relative h-[650px]">
        {movieData.movie.backdrop_path ? (
          <img
            src={imgBaseUrl + movieData.movie.backdrop_path}
            alt="movie"
            className="w-full h-full brightness-[.20] opacity-[0.9] object-cover inset-0 object-top select-none absolute"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 brightness-[.20] opacity-[0.9] absolute"></div>
        )}
        <MovieDetails
          movie={movieData.movie}
          certifications={movieData.certifications}
          watchProviders={movieData.watchProviders}
          credits={movieData.credits.crew.sort(
            (a, b) => b.popularity - a.popularity
          )}
          type={type}
        />
      </div>
      <div className="flex flex-row gap-8 mx-12">
        <div className="flex flex-col gap-8 w-[78%]">
          <Cast cast={movieData.credits.cast} type={type} />
          <Divider />
          {type === "tv" ? (
            <>
              <Seasons movie={movieData.movie} type={type} />
              <Divider />
            </>
          ) : null}
          <Review reviews={movieData.reviews} type={type} />
          <Divider />
          <Recommandations
            recommendations={movieData.recommendations}
            type={type}
          />
        </div>
        <RevenueDetails
          movie={movieData.movie}
          keywords={movieData.keywords}
          type={type}
        />
      </div>
    </div>
  ) : (
    <MovieSkeleton />
  );
}
