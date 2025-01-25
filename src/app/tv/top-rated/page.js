import React from "react";
import Movie from "@/components/movie/Movie";

export default function TopRated() {
  return (
    <Movie
      data={{
        type: "tv",
        title: "Top Rated TV Shows",
        path: "/top_rated",
      }}
    />
  );
}
