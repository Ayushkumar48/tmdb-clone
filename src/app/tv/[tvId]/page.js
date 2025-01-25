import Movies from "@/components/movie/MovieId/Movies";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  const headersList = await headers();
  const baseUrl = `${headersList.get("x-forwarded-proto")}://${headersList.get(
    "host"
  )}`;

  const tvId = (await params).tvId;
  try {
    const response = await fetch(`${baseUrl}/api`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        path: `/tv/${tvId}?language=en-US`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch movie data");
    }
    const data = (await response.json()).data;
    return {
      title: `${data.name || data.original_name} (TV Series ${
        data.first_air_date.split("-")[0]
      }-${
        data.in_production ? "" : data.last_air_date
      }) - The Movie Database (TMDB) - Clone`,
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return {
      title: "Movie Details",
    };
  }
}

export default async function TVId({ params }) {
  const tvId = (await params).tvId;

  return <Movies id={tvId} type="tv" />;
}
