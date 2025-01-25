import axios from "axios";
import { NextResponse } from "next/server";

// Existing GET handler remains the same
export async function GET(request) {
  try {
    const headers = request.headers;
    const path = headers.get("path");
    const baseUrl = process.env.TMDB_BASE_URL;
    const response = await axios.get(`${baseUrl}${path}`, {
      headers: {
        Authorization: "Bearer " + process.env.TMDB_READ_ACCESS_KEY,
      },
    });
    return NextResponse.json({ data: response.data });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "An error occurred while fetching trending data." },
      { status: 500 }
    );
  }
}

// New POST handler for batch fetching
export async function POST(request) {
  try {
    const { paths, type } = await request.json();
    const baseUrl = process.env.TMDB_BASE_URL;

    const fetchRequests = paths.map((path) =>
      axios
        .get(`${baseUrl}${path}`, {
          headers: {
            Authorization: "Bearer " + process.env.TMDB_READ_ACCESS_KEY,
          },
        })
        .catch((error) => ({ error: true, path }))
    );

    const responses = await Promise.all(fetchRequests);

    const combinedData = {
      movie: responses[0].data,
      certifications: responses[1].data.results,
      credits: responses[2].data,
      reviews: responses[3].data.results,
      recommendations: responses[4].data.results,
      images: responses[5].data,
      watchProviders:
        responses[6].data.results[responses[0].data.origin_country],
      keywords:
        type === "movie"
          ? responses[7].data.keywords
          : responses[7].data.results,
    };

    const certifications = combinedData.certifications.find(
      (item) => item.iso_3166_1 === combinedData.movie.origin_country[0]
    );
    combinedData.certifications = certifications;

    return NextResponse.json({ data: combinedData });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Batch fetch failed" }, { status: 500 });
  }
}
