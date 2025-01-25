import React from "react";
import { Skeleton } from "@mui/material";

export default function PersonSkeleton() {
  return (
    <div className="flex flex-row gap-6 px-12 py-9">
      <div className="w-1/4 flex flex-col gap-8">
        <Skeleton variant="rounded" width={"100%"} height={450} />
        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-8">
            <Skeleton variant="rounded" width={35} height={35} />
            <Skeleton variant="rounded" width={35} height={35} />
            <Skeleton variant="rounded" width={35} height={35} />
            <Skeleton variant="rounded" width={35} height={35} />
          </div>
          <Skeleton variant="text" width={"40%"} sx={{ fontSize: "2rem" }} />
          <div className="flex flex-col">
            <Skeleton
              variant="text"
              width={"35%"}
              sx={{ fontSize: "1.6rem" }}
            />
            <Skeleton
              variant="text"
              width={"50%"}
              sx={{ fontSize: "1.2rem" }}
            />
          </div>
          <div className="flex flex-col">
            <Skeleton
              variant="text"
              width={"35%"}
              sx={{ fontSize: "1.6rem" }}
            />
            <Skeleton
              variant="text"
              width={"50%"}
              sx={{ fontSize: "1.2rem" }}
            />
          </div>

          <div className="flex flex-col">
            <Skeleton
              variant="text"
              width={"35%"}
              sx={{ fontSize: "1.6rem" }}
            />
            <Skeleton
              variant="text"
              width={"50%"}
              sx={{ fontSize: "1.2rem" }}
            />
          </div>
          <div className="flex flex-col">
            <Skeleton
              variant="text"
              width={"35%"}
              sx={{ fontSize: "1.6rem" }}
            />
            <Skeleton
              variant="text"
              width={"50%"}
              sx={{ fontSize: "1.2rem" }}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-8">
        <Skeleton variant="text" width={"35%"} sx={{ fontSize: "3rem" }} />
        <div>
          <Skeleton variant="text" width={"15%"} sx={{ fontSize: "1.5rem" }} />
          <Skeleton variant="rounded" width={"100%"} height={230} />
        </div>
        <div className="mt-10">
          <Skeleton variant="text" width={"15%"} sx={{ fontSize: "1.5rem" }} />
          <Skeleton variant="rounded" width={"100%"} height={230} />
        </div>
        <div className="mt-10">
          <Skeleton variant="text" width={"15%"} sx={{ fontSize: "2rem" }} />
          <Skeleton variant="rounded" width={"100%"} height={500} />
        </div>
      </div>
    </div>
  );
}
