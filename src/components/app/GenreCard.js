/* eslint-disable @next/next/no-img-element */
import { Box } from "@mui/joy";
import { useState, useRef, useEffect } from "react";

export default function GenreCard({ data, type }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (boxRef.current) {
        setIsScrolled(boxRef.current.scrollLeft > 0);
      }
    };

    const currentRef = boxRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
      return () => currentRef.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="relative">
      <Box
        ref={boxRef}
        className="scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md scrollbar-track-rounded-md"
        sx={{
          display: "flex",
          gap: 3,
          py: 2,
          px: 2,
          overflow: "auto",
          scrollSnapType: "x mandatory",
          "& > *": {
            scrollSnapAlign: "center",
          },
          scrollBehavior: "smooth",
        }}
      >
        {data.genres.map((item, i) => (
          <a
            href={`/${type === "TV" ? "tv" : "movie"}/genre?g=${
              item.id
            }&name=${item.name.split(" ").join("_")}`}
            key={i}
            className="w-full flex flex-col gap-4"
          >
            <div className="w-44 hover:scale-110 duration-200 ease-in-out">
              <img
                src={`/${data.name.toLowerCase()}/${item.id.toString()}.jpg`}
                alt={item.name}
                className="w-full h-64 object-cover rounded-lg brightness-90"
                loading="lazy"
              />
            </div>
            <div className="font-semibold text-[16.5px] pl-2">{item.name}</div>
          </a>
        ))}
      </Box>
      <div
        className={`
          absolute top-0 right-0 h-full w-16 
          bg-gradient-to-l from-white to-transparent 
          pointer-events-none 
          transition-opacity duration-300 ease-in-out
          ${isScrolled ? "opacity-0" : "opacity-100"}
        `}
      ></div>
    </div>
  );
}
