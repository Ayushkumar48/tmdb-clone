import React from "react";
import Movie from "@/components/movie/Movie";

export default function OnTV() {
  return (
    <Movie
      data={{
        type: "tv",
        title: "Currently Airing TV Shows",
        path: "/on_the_air",
      }}
    />
  );
}
