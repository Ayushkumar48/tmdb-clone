/* eslint-disable @next/next/no-img-element */
"use client";
import { ArrowForwardIos, EditNote } from "@mui/icons-material";
import { Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const imgBase = "https://image.tmdb.org/t/p/original";

export default function WhereToWatch({ children, type, sendWhereToWatch }) {
  const [country, setCountry] = useState([]);
  const [watchProviders, setWatchProviders] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("IN");

  useEffect(() => {
    const fetchData = async () => {
      const response1 = await axios.get("/api", {
        headers: {
          path: "/watch/providers/regions",
        },
      });
      const response2 = await axios.get("/api", {
        headers: {
          path: `/watch/providers/${type}`,
        },
      });
      setCountry(response1.data.data.results);
      setWatchProviders(
        response2.data.data.results
          .sort((a, b) => a.display_priority - b.display_priority)
          .slice(0, 70)
      );
    };
    fetchData();
  }, [type]);
  return (
    <div className="shadow-lg rounded-md ring-1 w-full ring-gray-900/10">
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-3 flex flex-row justify-between w-full"
      >
        <div className="text-xl font-semibold">{children}</div>
        <div className={`${open ? "rotate-90" : ""}`}>
          <ArrowForwardIos sx={{ height: 15 }} />
        </div>
      </button>
      {open ? (
        <div>
          <Divider />
          <div className="px-3 py-2 flex flex-col gap-2">
            <div>
              My Servies{" "}
              <span className="cursor-pointer">
                <EditNote sx={{ height: 25 }} />
              </span>
            </div>
            <Divider />
            <select
              className="hover:cursor-pointer bg-slate-300 px-2 py-1.5 rounded-lg shadow ring-inset ring-1 ring-gray-400 hover:ring-0 hover:bg-slate-200 duration-150 ease-in-out outline-none"
              name="data"
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                sendWhereToWatch(e.target.value, 2);
              }}
            >
              {country.map((item, i) => (
                <option
                  value={item.iso_3166_1}
                  key={i}
                  className="px-2 py-1 bg-white text-black checked:bg-[#01B3E4] checked:text-white"
                >
                  {item.english_name}
                </option>
              ))}
            </select>
            <div className="flex flex-wrap justify-between gap-x-1.5 gap-y-1">
              {watchProviders.map((item, i) => (
                <div
                  className="cursor-pointer ring-1 ring-gray-300 rounded-lg"
                  key={i}
                >
                  <img
                    src={imgBase + item.logo_path}
                    alt={item.provider_name}
                    className="h-14 w-auto rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
