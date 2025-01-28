"use client";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";

export default function Cards({ path, children }) {
  const [data, setData] = useState(path);
  const [value, setValue] = useState("1");
  useEffect(() => {
    setData(path);
  }, [path]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col gap-8 lg:ml-4">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Trending Tabs"
        sx={{ bgcolor: "transparent" }}
      >
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:pl-8 w-full">
          <div className="text-2xl font-medium duration-300">{children}</div>
          <TabList
            disableUnderline
            sx={{
              p: 0,
              m: 0,

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
            className="gap-0 lg:gap-2 text-sm"
          >
            {Object.entries(data).map(([k, v], index) => (
              <Tab key={index} disableIndicator value={(index + 1).toString()}>
                <div
                  className={
                    (index + 1).toString() === value
                      ? "bg-gradient-to-br from-[#c0fed1] to-[#1dd0a3] inline-block text-transparent bg-clip-text"
                      : "text-black"
                  }
                >
                  {v[0] ? k.split("_").join(" ") : null}
                </div>
              </Tab>
            ))}
          </TabList>
        </div>
        {Object.entries(data).map(([k, v], index) => (
          <TabPanel key={index} value={(index + 1).toString()}>
            <Card data={v} />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
