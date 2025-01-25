import MainPicture from "@/components/app/MainPicture";
import Cards from "@/components/app/Cards";
import GenreCards from "@/components/app/GenreCards";

export default function Home() {
  const trendingPaths = [
    {
      path: "/trending/all/day?language=en-US",
      for: "Today",
    },
    {
      path: "/trending/all/week?language=en-US",
      for: "This Week",
    },
  ];

  const popularPaths = [
    {
      path: `/tv/on_the_air?language=en-US&page=1`,
      for: "Streaming",
    },
    {
      path: `/tv/popular?language=en-US&page=1`,
      for: "On TV",
    },
    {
      path: `/movie/popular?language=en-US&page=1`,
      for: "In Theaters",
    },
    {
      path: `/movie/now_playing?language=en-US&page=1`,
      for: "Latest Releases",
    },
  ];
  const freeToWatch = [
    {
      path: `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_watch_monetization_types=free`,
      for: "Movies",
    },
    {
      path: `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_watch_monetization_types=free`,
      for: "TV",
    },
  ];

  return (
    <main className="flex flex-col gap-10 mb-10">
      <MainPicture />
      <Cards name="Trending" path={trendingPaths} />
      <Cards name="What's Popular" path={popularPaths} />
      <Cards name="Free To Watch" path={freeToWatch} />
      <GenreCards name="Genre" />
    </main>
  );
}
