/* eslint-disable @next/next/no-img-element */
import { Box } from "@mui/joy";
import { useState, useRef, useEffect } from "react";

const imgBase = "https://image.tmdb.org/t/p/original";

export default function KnownFor({ credits }) {
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
          overflow: "auto",
          py: 2,
          scrollSnapType: "x mandatory",
          "& > *": {
            scrollSnapAlign: "center",
          },
          scrollBehavior: "smooth",
        }}
      >
        {credits.map((item, i) => (
          <a
            href={`/${item.media_type}/${item.id}`}
            key={i}
            className="w-full flex flex-col gap-2"
          >
            <div className="w-40">
              <img
                src={imgBase + (item.poster_path || item.backdrop_path)}
                alt={item.title || item.original_title}
                className="w-full h-60 object-cover rounded-lg brightness-90"
                loading="lazy"
              />
            </div>
            <div className="text-[16.5px] text-center">
              {item.title || item.original_title}
            </div>
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
