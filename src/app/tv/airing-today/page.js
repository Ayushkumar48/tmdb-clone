import React from "react";
import Movie from "@/components/movie/Movie";

export default function AiringToday() {
  return (
    <Movie
      data={{
        type: "tv",
        title: "Airing Today TV Shows",
        path: "/airing_today",
      }}
    />
  );
}
