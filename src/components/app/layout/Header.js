/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Add, Notifications, Close } from "@mui/icons-material";
import NavLi from "./NavLi";
import Profile from "./Profile";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const navlis = [
    {
      name: "Movies",
      lists: [
        { href: "/movie", menuItem: "Popular" },
        { href: "/movie/now-playing", menuItem: "Now Playing" },
        { href: "/movie/upcoming", menuItem: "Upcoming" },
        { href: "/movie/top-rated", menuItem: "Top Rated" },
      ],
    },
    {
      name: "TV Shows",
      lists: [
        { href: "/tv", menuItem: "Popular" },
        { href: "/tv/airing-today", menuItem: "Airing Today" },
        { href: "/tv/on-the-air", menuItem: "On TV" },
        { href: "/tv/top-rated", menuItem: "Top Rated" },
      ],
    },
    {
      name: "People",
      lists: [{ href: "/person", menuItem: "Popular People" }],
    },
    {
      name: "More",
      lists: [
        { href: "#", menuItem: "Discussions" },
        { href: "#", menuItem: "Leaderboard" },
        { href: "#", menuItem: "Support" },
      ],
    },
  ];

  const addShow = {
    name: "+",
    lists: [
      { href: "#", menuItem: "Add New Movie" },
      { href: "#", menuItem: "Add new TV Show" },
    ],
  };

  const [searchOn, setSearchOn] = useState(pathname === "/" ? true : false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <div className="flex flex-row text-sm justify-between bg-[#032541] px-10 py-5 font-bold items-center text-white">
        <div className="flex flex-row gap-8 justify-center items-center">
          <a href="/" className="w-[170px]">
            <Image
              src="/tmdb-logo.svg"
              alt="tmdb-logo"
              width={150}
              height={20}
              style={{ width: "auto", height: "auto" }}
              className="select-none"
              priority
            />
          </a>
          {navlis.map((item, i) => (
            <NavLi key={i} data={item}>
              {item.name}
            </NavLi>
          ))}
        </div>

        <div className="flex flex-row gap-8 justify-center items-center">
          <NavLi data={addShow}>
            <Add
              sx={{
                scale: 1.25,
              }}
            />
          </NavLi>
          <a
            href="/"
            className="border-[1.1px] rounded-[0.2rem] py-[2px] px-[5px] font-normal text-[12px] border-white hover:border-black hover:text-black hover:bg-white duration-200 ease-in-out"
          >
            EN
          </a>
          <a href="/">
            <Notifications />
          </a>
          <Profile />
          {isClient && !searchOn ? (
            <button>
              <Search
                className="text-[#1BB8D8] scale-[1.18] brightness-125 duration-200 ease-in-out hover:brightness-105"
                onClick={() => setSearchOn(true)}
              />
            </button>
          ) : (
            <button>
              <Close
                className="text-white scale-[1.18] brightness-125 duration-200 ease-in-out hover:brightness-105"
                onClick={() => setSearchOn(false)}
              />
            </button>
          )}
        </div>
      </div>

      <div
        className={`relative ${
          searchOn ? "block" : "hidden"
        } transition-all duration-300 ease-in-out`}
      >
        <Search className="absolute -translate-y-1/2 top-1/2 left-28 text-black" />
        <input
          type="text"
          className="w-full h-12 pl-36 italic text-slate-400 outline-none border-b-[1.5px] border-black"
          placeholder="Search for a movie, tv show, person..."
        />
      </div>
    </div>
  );
}
