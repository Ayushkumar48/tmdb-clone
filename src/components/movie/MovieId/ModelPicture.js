/* eslint-disable @next/next/no-img-element */
import { ArrowForwardIosRounded, Close } from "@mui/icons-material";
import { CircularProgress } from "@mui/joy";
import { useState, useEffect } from "react";

const imgBaseUrl = "https://image.tmdb.org/t/p/original";

export default function ModelPicture({ setOpenModel, images }) {
  const allImages = [
    ...(images?.backdrops || []),
    ...(images?.posters || []),
    ...(images?.logos || []),
  ];
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && currentImage > 0) {
        setCurrentImage((val) => val - 1);
      } else if (
        e.key === "ArrowRight" &&
        currentImage < allImages.length - 1
      ) {
        setCurrentImage((val) => val + 1);
      } else if (e.key === "Escape") {
        setOpenModel(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentImage, allImages.length, setOpenModel]);

  useEffect(() => {
    setIsLoading(true);
  }, [currentImage]);

  return (
    <div className="z-[60] w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/70">
      <div className="min-h-[50px] min-w-[90px] sm:w-[55vw] sm:h-[80vh] w-[95vw] h-[70vh] bg-black text-white rounded-lg ring-1 ring-gray-300 shadow-inner shadow-gray-300/60">
        <div className="relative w-full h-full flex flex-col justify-between py-6">
          <h5 className="text-center text-2xl font-semibold">Images / Logos</h5>
          <div className="absolute top-2 right-2 flex flex-row gap-2 items-center">
            <div className="ring-1 ring-gray-100 px-1 py-0.5 rounded-sm hidden lg:inline">
              Esc
            </div>
            <button
              onClick={() => setOpenModel(false)}
              className="ring-1 ring-inset hover:ring-0 duration-150 ease-in-out ring-gray-400 p-0.5 rounded-md bg-white hover:bg-[#01b4e4] hover:text-white text-black"
              title="Esc"
            >
              <Close />
            </button>
          </div>

          <div className="relative flex justify-center items-center">
            {isLoading && (
              <div className="absolute flex justify-center items-center w-full h-[30rem]">
                <CircularProgress
                  sx={{
                    "--CircularProgress-size": "40px",
                    "--CircularProgress-trackThickness": "4px",
                    "--CircularProgress-progressThickness": "4px",
                  }}
                />
              </div>
            )}
            {allImages.length > 0 ? (
              <img
                src={`${imgBaseUrl}${allImages[currentImage].file_path}`}
                alt={`Image ${currentImage + 1} of ${allImages.length}`}
                className={`w-full h-auto max-h-[30rem] object-cover duration-200 ease-in-out ${
                  isLoading ? "hidden" : "block"
                }`}
                onLoad={() => setIsLoading(false)}
              />
            ) : (
              <div className="text-center">No images available</div>
            )}
          </div>

          <div className="flex flex-row justify-between px-4">
            <button
              className="ring-2 ring-gray-900/50 hover:ring-0 bg-slate-200 hover:bg-[#01b4e4] duration-150 ease-in-out py-1 px-2 rounded hover:text-white text-black shadow-lg disabled:cursor-not-allowed disabled:opacity-30"
              type="button"
              disabled={currentImage === 0}
              onClick={() => setCurrentImage((val) => val - 1)}
              title="Backward Arrow"
            >
              <ArrowForwardIosRounded className="rotate-180" />
            </button>
            <button
              className="ring-2 ring-gray-900/50 hover:ring-0 bg-slate-200 hover:bg-[#01b4e4] duration-150 ease-in-out py-1 px-2 rounded hover:text-white text-black shadow-lg disabled:cursor-not-allowed disabled:opacity-30"
              disabled={currentImage === allImages.length - 1}
              onClick={() => setCurrentImage((val) => val + 1)}
              title="Foreward Arrow"
            >
              <ArrowForwardIosRounded />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
