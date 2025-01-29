import Cast from "@/components/movie/cast/Cast";
import React from "react";

export default async function Page({ params }) {
  const { tvId } = await params;
  return (
    <div>
      <Cast type="tv" movieId={tvId} />
    </div>
  );
}
