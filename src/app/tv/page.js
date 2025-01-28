import React from "react";
import Movie from "@/components/movie/Movie";

export default function PopularTV() {
  return (
    <Movie data={{ type: "tv", title: "Popular TV Shows", path: "/popular" }} />
  );
}
