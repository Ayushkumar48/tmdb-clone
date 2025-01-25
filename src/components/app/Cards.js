"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";

export default function Cards({ name, path }) {
  const [data, setData] = useState(
    path.map(() => ({
      results: new Array(12).fill(null),
    }))
  );
  const [value, setValue] = useState("1");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = path.map((p) =>
          axios.get("/api", {
            headers: {
              path: p.path,
            },
          })
        );

        const responses = await Promise.all(requests);

        const fetchedData = responses.map((response) => response.data.data);

        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [path]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col gap-8 ml-4">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Trending Tabs"
        sx={{ bgcolor: "transparent" }}
      >
        <div className="flex flex-row gap-8 items-center ml-8">
          <div className="text-2xl font-medium duration-300">{name}</div>
          <TabList
            disableUnderline
            sx={{
              p: 0,
              m: 0,
              gap: 2,
              fontSize: 16,
              fontWeight: 620,
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
            {path.map((p, index) => (
              <Tab key={index} disableIndicator value={(index + 1).toString()}>
                <div
                  className={
                    (index + 1).toString() === value
                      ? "bg-gradient-to-br from-[#c0fed1] to-[#1dd0a3] inline-block text-transparent bg-clip-text"
                      : "text-black"
                  }
                >
                  {p.for}
                </div>
              </Tab>
            ))}
          </TabList>
        </div>
        {data.map((d, index) => (
          <TabPanel key={index} value={(index + 1).toString()}>
            <Card data={d.results} />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
