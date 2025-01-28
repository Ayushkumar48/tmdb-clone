import Movies from "@/components/movie/MovieId/Movies";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

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
      console.error("Failed to fetch TV show data");
      return { title: "TV Show Details" };
    }
    const data = (await response.json()).data;
    return {
      title: `${data.name || data.original_name} ${
        data.first_air_date
          ? `(TV Series ${data.first_air_date.split("-")[0]}`
          : ""
      }-${
        data.in_production ? "present" : data.last_air_date
      }) - The Movie Database (TMDB) - Clone`,
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return {
      title: "TV Show Details",
    };
  }
}

export default async function TVId({ params }) {
  const tvId = (await params).tvId;
  const headersList = await headers();
  const baseUrl = `${headersList.get("x-forwarded-proto")}://${headersList.get(
    "host"
  )}`;
  try {
    const response = await fetch(`${baseUrl}/api`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        path: `/tv/${tvId}?language=en-US`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch tv show data");
    }
    const data = (await response.json()).data;

    if (!(data?.name || data.original_name)) {
      notFound();
    }
    return <Movies id={tvId} type="tv" />;
  } catch (error) {
    console.error("Error fetching tv show data:", error);
    notFound();
  }
}
