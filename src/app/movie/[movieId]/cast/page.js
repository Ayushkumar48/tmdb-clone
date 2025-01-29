import Cast from "@/components/movie/cast/Cast";
import React from "react";

export default async function Page({ params }) {
  const { movieId } = await params;
  return (
    <div>
      <Cast type="movie" movieId={movieId} />
    </div>
  );
}
