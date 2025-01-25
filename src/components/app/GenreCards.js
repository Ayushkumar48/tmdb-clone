"use client";
import React, { useState } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import GenreCard from "./GenreCard";

export default function Cards({ name }) {
  const data = [
    {
      name: "Movies",
      genres: [
        {
          id: 28,
          name: "Action",
        },
        {
          id: 12,
          name: "Adventure",
        },
        {
          id: 16,
          name: "Animation",
        },
        {
          id: 35,
          name: "Comedy",
        },
        {
          id: 80,
          name: "Crime",
        },
        {
          id: 99,
          name: "Documentary",
        },
        {
          id: 18,
          name: "Drama",
        },
        {
          id: 10751,
          name: "Family",
        },
        {
          id: 14,
          name: "Fantasy",
        },
        {
          id: 36,
          name: "History",
        },
        {
          id: 27,
          name: "Horror",
        },
        {
          id: 10402,
          name: "Music",
        },
        {
          id: 9648,
          name: "Mystery",
        },
        {
          id: 10749,
          name: "Romance",
        },
        {
          id: 878,
          name: "Science Fiction",
        },
        {
          id: 10770,
          name: "TV Movie",
        },
        {
          id: 53,
          name: "Thriller",
        },
        {
          id: 10752,
          name: "War",
        },
        {
          id: 37,
          name: "Western",
        },
      ],
    },
    {
      name: "TV",
      genres: [
        {
          id: 10759,
          name: "Action & Adventure",
        },
        {
          id: 16,
          name: "Animation",
        },
        {
          id: 35,
          name: "Comedy",
        },
        {
          id: 80,
          name: "Crime",
        },
        {
          id: 99,
          name: "Documentary",
        },
        {
          id: 18,
          name: "Drama",
        },
        {
          id: 10751,
          name: "Family",
        },
        {
          id: 10762,
          name: "Kids",
        },
        {
          id: 9648,
          name: "Mystery",
        },
        {
          id: 10763,
          name: "News",
        },
        {
          id: 10764,
          name: "Reality",
        },
        {
          id: 10765,
          name: "Sci-Fi & Fantasy",
        },
        {
          id: 10766,
          name: "Soap",
        },
        {
          id: 10767,
          name: "Talk",
        },
        {
          id: 10768,
          name: "War & Politics",
        },
        {
          id: 37,
          name: "Western",
        },
      ],
    },
  ];
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col gap-8 pl-4">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Trending Tabs"
        sx={{ bgcolor: "transparent" }}
      >
        <div className="flex flex-row gap-8 items-center ml-8">
          <div className="text-2xl font-semibold duration-300">{name}</div>
          <TabList
            disableUnderline
            sx={{
              p: 0,
              gap: 2,
              fontSize: 16,
              fontWeight: 620,
              transitionTimingFunction: "ease-in-out",
              transitionDuration: "300ms",
              borderRadius: 9999,
              border: "1px solid black",
              bgcolor: "background.level1",
              [`& .${tabClasses.root}[aria-selected="true"]`]: {
                boxShadow: "sm",
                bgcolor: "#032541",
                color: "#19aa84",
              },
            }}
          >
            {data.map((d, index) => (
              <Tab key={index} disableIndicator value={(index + 1).toString()}>
                <div
                  className={
                    (index + 1).toString() === value
                      ? "bg-gradient-to-br from-[#c0fed1] to-[#1dd0a3] inline-block text-transparent bg-clip-text"
                      : "text-black"
                  }
                >
                  {d.name}
                </div>
              </Tab>
            ))}
          </TabList>
        </div>
        {data.map((d, index) => (
          <TabPanel key={index} value={(index + 1).toString()} sx={{ py: 2 }}>
            <GenreCard data={d} />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
