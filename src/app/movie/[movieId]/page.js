import Movies from "@/components/movie/MovieId/Movies";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const headersList = await headers();
  const baseUrl = `${headersList.get("x-forwarded-proto")}://${headersList.get(
    "host"
  )}`;

  const movieId = (await params).movieId;
  try {
    const response = await fetch(`${baseUrl}/api`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        path: `/movie/${movieId}?language=en-US`,
      },
    });
    if (!response.ok) {
      console.error("Failed to fetch movie data");
      return { title: "Movie Details" };
    }
    const data = (await response.json()).data;

    return {
      title: `${data.title || data.original_title} ${
        data.release_date ? `(${data.release_date.split("-")[0]})` : ""
      } - The Movie Database (TMDB) - Clone`,
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return {
      title: "Movie Details",
    };
  }
}

export default async function MovieId({ params }) {
  const movieId = (await params).movieId;

  const headersList = await headers();
  const baseUrl = `${headersList.get("x-forwarded-proto")}://${headersList.get(
    "host"
  )}`;

  try {
    const response = await fetch(`${baseUrl}/api`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        path: `/movie/${movieId}?language=en-US`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch movie data");
    }
    const data = (await response.json()).data;

    if (!(data?.title || data?.original_title)) {
      notFound();
    }

    return <Movies id={movieId} type="movie" />;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    notFound();
  }
}
