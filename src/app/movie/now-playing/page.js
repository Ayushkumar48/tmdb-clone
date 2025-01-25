import React from "react";
import Movie from "@/components/movie/Movie";

export default function NowPlaying() {
  return (
    <Movie
      data={{
        type: "movie",
        title: "Now Playing Movies",
        path: "/now_playing",
      }}
    />
  );
}
