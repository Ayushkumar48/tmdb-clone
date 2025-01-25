import React from "react";
import Movie from "@/components/movie/Movie";

export default function TopRated() {
  return (
    <Movie
      data={{ type: "movie", title: "Top Rated Movies", path: "/top_rated" }}
    />
  );
}
