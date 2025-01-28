/* eslint-disable @next/next/no-img-element */
import { ArrowRightAlt } from "@mui/icons-material";
import { Box } from "@mui/joy";
import { useState, useRef, useEffect } from "react";

const imgBaseUrl = "https://image.tmdb.org/t/p/original";

export default function Cast({ cast }) {
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
    <div className="flex flex-col">
      <h2 className="text-2xl font-semibold lg:pl-4">Top Billed Cast</h2>
      <div className="relative">
        <Box
          ref={boxRef}
          className={`scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md scrollbar-track-rounded-md overflow-auto flex gap-4 py-2 px-2 scroll-smooth`}
          sx={{
            pb: 4,
            pl: 2,
            scrollSnapType: "x mandatory",
            "& > *": {
              scrollSnapAlign: "center",
            },
            scrollBehavior: "smooth",
          }}
        >
          {cast?.length ? (
            cast.slice(0, 10).map((item, i) => (
              <div
                key={i}
                className="flex flex-col bg-white shadow-xl rounded-lg ring-1 ring-slate-200 min-w-36 max-w-36"
              >
                <a
                  className={`h-[12rem] flex justify-center items-center ${
                    item.profile_path ? "" : "bg-gray-300 rounded-t-lg w-full"
                  }`}
                  href={`/person/${item.id}`}
                >
                  {item.profile_path ? (
                    <img
                      src={imgBaseUrl + item.profile_path}
                      alt={item.name}
                      className={`h-full object-cover rounded-t-lg w-full`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full rounded-lg">
                      <img
                        src={item.gender === 2 ? "/male.svg" : "/female.svg"}
                        alt=""
                        className="w-full h-full scale-50"
                      />
                    </div>
                  )}
                </a>
                <div className="px-2 py-2">
                  <a
                    className="font-bold text-[16.5px] hover:opacity-60"
                    href="#"
                  >
                    {item.name}
                  </a>
                  <div className="text-[15px]">{item.character}</div>
                </div>
              </div>
            ))
          ) : (
            <div>
              We don&apos;t have any cast added to this movie. You can help by
              adding some!
            </div>
          )}
          {cast.length >= 10 ? (
            <div className="flex justify-center items-center">
              <button className="font-bold whitespace-nowrap hover:text-[#00000075]">
                View More <ArrowRightAlt />
              </button>
            </div>
          ) : null}
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

      <div className="mt-4 font-semibold pl-4">
        {cast?.length ? (
          <button className="hover:opacity-60 text-lg">Full Cast & Crew</button>
        ) : (
          <button className="hover:opacity-60 text-lg">
            Add Missing Cast & Crew
          </button>
        )}
      </div>
    </div>
  );
}
