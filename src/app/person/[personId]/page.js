"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import SideInfo from "@/components/personId/SideInfo";
import Content from "@/components/personId/Content";

export default function PersonId() {
  const [personDetails, setPersonDetails] = useState(null);
  const personId = usePathname().split("/").pop();

  useEffect(() => {
    const fetchData = async () => {
      setPersonDetails(null);

      try {
        const paths = [
          `/person/${personId}`,
          `/person/${personId}/combined_credits`,
          `/person/${personId}/external_ids`,
        ];
        const [person, credits, social] = await Promise.all(
          paths.map((path) =>
            axios.get("/api", {
              headers: { path },
            })
          )
        );
        setPersonDetails({
          person: person.data.data,
          credits: credits.data.data,
          social: social.data.data,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to fetch person details.");
      }
    };

    fetchData();
  }, [personId]);

  if (!personDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row gap-6 px-12 py-9">
      <SideInfo
        person={personDetails.person}
        social={personDetails.social}
        knownCredits={
          personDetails.credits.crew.length + personDetails.credits.cast.length
        }
      />
      <Content person={personDetails.person} credits={personDetails.credits} />
    </div>
  );
}
