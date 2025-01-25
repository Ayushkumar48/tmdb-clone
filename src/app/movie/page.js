import React from "react";
import Movie from "@/components/movie/Movie";

export default function MovieComponent() {
  return (
    <Movie
      data={{ type: "movie", title: "Popular TV Movies", path: "/popular" }}
    />
  );
}
