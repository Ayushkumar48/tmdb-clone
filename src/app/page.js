"use client";
import MainPicture from "@/components/app/MainPicture";
import Cards from "@/components/app/Cards";
import GenreCards from "@/components/app/GenreCards";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState({
    trending: {
      1: new Array(12).fill(null),
      2: new Array(12).fill(null),
    },
    popular: {
      1: new Array(12).fill(null),
      2: new Array(12).fill(null),
      3: new Array(12).fill(null),
      4: new Array(12).fill(null),
    },
    freeToWatch: {
      1: new Array(12).fill(null),
      2: new Array(12).fill(null),
    },
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const paths = [
          "/trending/all/day?language=en-US",
          "/trending/all/week?language=en-US",
          "/tv/on_the_air?language=en-US&page=1",
          "/tv/popular?language=en-US&page=1",
          "/movie/popular?language=en-US&page=1",
          "/movie/now_playing?language=en-US&page=1",
          "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=IN&with_watch_monetization_types=free",
          "/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=IN&with_watch_monetization_types=free",
        ];
        const response = await axios.post("/api/frontpage", { paths });
        setData(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDetails();
  }, []);
  console.log(data);
  return (
    <main className="flex flex-col gap-10 mb-10">
      <MainPicture />
      <Cards path={data.trending}>Trending</Cards>
      <Cards path={data.popular}>What&apos;s Popular</Cards>
      <Cards path={data.freeToWatch}>Free To Watch</Cards>
      <GenreCards name="Genre" />
    </main>
  );
}
