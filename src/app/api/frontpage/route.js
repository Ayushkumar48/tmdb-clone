import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { paths } = await request.json();
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
      trending: {
        Today: responses[0].data.results,
        This_Week: responses[1].data.results,
      },
      popular: {
        Streaming: responses[2].data.results,
        On_TV: responses[3].data.results,
        For_Rent: responses[4].data.results,
        In_Theaters: responses[5].data.results,
      },
      freeToWatch: {
        Movies: responses[6].data.results,
        TV: responses[7].data.results,
      },
    };
    return NextResponse.json({ data: combinedData });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Batch fetch failed" }, { status: 500 });
  }
}
