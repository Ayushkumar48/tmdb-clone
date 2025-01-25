import React from "react";
import Movie from "@/components/movie/Movie";

export default function Upcoming() {
  return (
    <Movie
      data={{ type: "movie", title: "Upcoming Shows", path: "/upcoming" }}
    />
  );
}
