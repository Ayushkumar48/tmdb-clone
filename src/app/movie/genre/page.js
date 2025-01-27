import Genre from "@/components/genre/Genre";
import React, { Suspense } from "react";

export default function GenrePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Genre type="movie" />
    </Suspense>
  );
}
