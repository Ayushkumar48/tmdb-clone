/* eslint-disable @next/next/no-img-element */
import React from "react";
import Markdown from "react-markdown";

const imgBaseUrl = "https://image.tmdb.org/t/p/original";

export default function Review({ reviews }) {
  const review = reviews.reduceRight((highest, review) => {
    const currentRating = review.author_details.rating || 0;
    const highestRating = highest.author_details?.rating || 0;

    return currentRating >= highestRating ? review : highest;
  }, reviews[0] || null);

  if (!review) {
    return (
      <div className="pl-4">
        <h4 className="text-2xl font-semibold pb-2">
          Social ({reviews.length})
        </h4>
        <div>
          We don&apos;t have any reviews. Would you like to{" "}
          <a href="#" className="text-blue-700 hover:text-blue-500">
            write one
          </a>
          ?
        </div>
      </div>
    );
  }

  const date = new Date(
    review.updated_at || review.created_at
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="pl-4">
      <h4 className="text-2xl font-semibold pb-2">Social ({reviews.length})</h4>
      <div className="flex flex-col gap-6 ring-1 ring-gray-300 py-4 px-6 rounded-lg shadow-lg">
        <div className="flex flex-row gap-6 items-center">
          {review?.author_details?.avatar_path ? (
            <img
              className="w-12 h-12 rounded-full shadow-sm cursor-pointer"
              src={imgBaseUrl + review?.author_details?.avatar_path}
              alt="use-avatar"
            />
          ) : (
            <div className="w-12 h-12 flex justify-center items-center bg-red-600 text-white rounded-full shadow-sm cursor-pointer">
              {(review.author_details.name ||
                review.author_details.username ||
                review.author)[0].toUpperCase() || "U"}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <div className="text-xl font-bold hover:text-[#000000a2] cursor-pointer">
              A review by{" "}
              {review.author_details.name ||
                review.author_details.username ||
                review.author ||
                "User"}
            </div>
            <div className="flex flex-row gap-2">
              <div className="bg-[#032541] px-2 py-[0.6px] rounded-lg text-white">
                ★ {Math.round(review.author_details.rating * 10)}{" "}
                <span className="text-[10px]">%</span>
              </div>
              <div>
                {review.updated_at ? "Updated" : "Written"} by{" "}
                <strong>
                  {review.author_details.name ||
                    review.author_details.username ||
                    review.author ||
                    "User"}
                </strong>{" "}
                on {date}
              </div>
            </div>
          </div>
        </div>
        <div className="line-clamp-3">
          <Markdown>{review.content}</Markdown>
        </div>
      </div>
      <button className="pt-4 text-xl font-semibold hover:opacity-60">
        Read All Reviews
      </button>
    </div>
  );
}
