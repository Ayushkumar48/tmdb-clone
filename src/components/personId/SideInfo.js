/* eslint-disable @next/next/no-img-element */
import {
  Facebook,
  Instagram,
  Link,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { Divider } from "@mui/material";
import React from "react";

const imgBase = "https://image.tmdb.org/t/p/original";

export default function SideInfo({ person, social, knownCredits }) {
  return (
    <div className="flex flex-col gap-10 w-1/4">
      <div className="w-full">
        <img
          src={imgBase + person.profile_path}
          alt={person.name}
          className="h-auto w-full rounded-lg shadow"
        />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap md:justify-normal justify-between gap-1 lg:flex-row md:gap-6">
          {social.instagram_id && (
            <a
              href={`https://instagram.com/${social.instagram_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center"
            >
              <Instagram
                sx={{ fontSize: 30 }}
                className="hover:cursor-pointer"
              />
            </a>
          )}
          {social.facebook_id && (
            <a
              href={`https://www.facebook.com/${social.facebook_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center"
            >
              <Facebook
                sx={{ fontSize: 30 }}
                className="hover:cursor-pointer"
              />
            </a>
          )}
          {social.twitter_id && (
            <a
              href={`https://twitter.com/${social.twitter_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center"
            >
              <Twitter sx={{ fontSize: 30 }} className="hover:cursor-pointer" />
            </a>
          )}
          {social.youtube_id && (
            <a
              href={`https://www.youtube.com/${social.youtube_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center"
            >
              <YouTube sx={{ fontSize: 30 }} className="hover:cursor-pointer" />
            </a>
          )}
          {person.homepage && (
            <div className="inline-flex items-center justify-center">
              <Divider orientation="vertical" />
              <a
                href={person.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center"
              >
                <Link sx={{ fontSize: 30 }} className="hover:cursor-pointer" />
              </a>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-semibold pb-2">Personal Info</h3>
          <div className="flex flex-col gap-5 text-lg">
            {person.known_for_department ? (
              <div className="flex flex-col">
                <div className="font-semibold">Known For</div>
                <div>{person.known_for_department}</div>
              </div>
            ) : null}
            {knownCredits ? (
              <div className="flex flex-col">
                <div className="font-semibold">Known Credits</div>
                <div>{knownCredits}</div>
              </div>
            ) : null}
            {person.gender ? (
              <div className="flex flex-col">
                <div className="font-semibold">Gender</div>
                <div>
                  {person.gender === 1
                    ? "Female"
                    : person.gender === 2
                    ? "Male"
                    : person.gender === 3
                    ? "Non-binary"
                    : "Not set / not specified"}
                </div>
              </div>
            ) : null}
            {person.birthday ? (
              <div className="flex flex-col">
                <div className="font-semibold">Birthday</div>
                <div>
                  {new Date(person.birthday).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            ) : null}
            {person.deathday ? (
              <div className="flex flex-col">
                <div className="font-semibold">Day of Death</div>
                <div>
                  {new Date(person.deathday).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            ) : null}
            {person.place_of_birth ? (
              <div className="flex flex-col">
                <div className="font-semibold">Place of Birth</div>
                <div>{person.place_of_birth}</div>
              </div>
            ) : null}
            {person.also_known_as?.length > 0 ? (
              <div className="flex flex-col">
                <div className="font-semibold">Also Known As</div>
                <div className="flex flex-col gap-0">
                  {person.also_known_as.map((item, i) => (
                    <div key={i}>{item}</div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
