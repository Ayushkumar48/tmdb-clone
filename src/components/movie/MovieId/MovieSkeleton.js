import { Divider, Skeleton } from "@mui/material";
import { Box } from "@mui/joy";

export default function MovieSkeleton() {
  const cast = new Array(10).fill(null);
  return (
    <div className="px-16 py-12 w-full">
      <div className="flex flex-row gap-10 w-full pb-8">
        <Skeleton variant="rounded" height={450} width={300} />
        <div className="flex flex-col gap-4 w-[65%]">
          <div>
            <div className="flex flex-row gap-1">
              <Skeleton
                variant="text"
                sx={{ fontSize: "2rem" }}
                className="w-[35%]"
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "2rem" }}
                className="w-[10%]"
              />
            </div>
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem" }}
              className="w-[40%]"
            />
          </div>
          <div className="flex flex-row gap-12">
            <Skeleton variant="circular" height={64} width={64} />
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.2rem" }}
              className="w-[5%]"
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.2rem" }}
              className="w-[10%]"
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.2rem" }}
              className="w-[10%]"
            />
          </div>
          <div className="flex flex-row gap-8">
            <Skeleton variant="circular" height={44} width={44} />
            <Skeleton variant="circular" height={44} width={44} />
            <Skeleton variant="circular" height={44} width={44} />
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.2rem" }}
              className="w-[10%]"
            />
          </div>
          <Skeleton
            variant="text"
            sx={{ fontSize: "1.2rem" }}
            className="w-[50%]"
          />
          <div className="flex flex-col gap-2">
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.2rem" }}
              className="w-[90%]"
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.2rem" }}
              className="w-[84%]"
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.2rem" }}
              className="w-[82%]"
            />

            <Skeleton
              variant="text"
              sx={{ fontSize: "1.2rem" }}
              className="w-[92%]"
            />
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1 w-full">
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.2rem" }}
                className="w-[25%]"
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.2rem" }}
                className="w-[15%]"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.2rem" }}
                className="w-[25%]"
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.2rem" }}
                className="w-[15%]"
              />
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex flex-row gap-10">
        <div className="flex flex-col gap-10 w-[80%]">
          <div className="w-full">
            <div className="pl-4">
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.6rem" }}
                className="w-20"
              />
            </div>
            <div className="relative w-full">
              <Box
                className={`scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md scrollbar-track-rounded-md overflow-auto flex gap-4 py-2 px-2 scroll-smooth`}
                sx={{
                  pb: 4,
                  pl: 2,
                  scrollSnapType: "x mandatory",
                  "& > *": {
                    scrollSnapAlign: "center",
                  },
                }}
              >
                {cast.map((item, i) => (
                  <div
                    key={i}
                    className="w-full flex flex-col bg-white shadow-xl rounded-lg ring-1 ring-slate-200"
                  >
                    <Skeleton
                      variant="rounded"
                      width={"9rem"}
                      height={"12rem"}
                    />

                    <div className="px-2 py-2">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "1.2rem" }}
                        className="w-[6.5rem]"
                      />
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "0.8rem" }}
                        className="w-20"
                      />
                    </div>
                  </div>
                ))}
              </Box>
            </div>
          </div>
          <div className="w-full flex flex-col gap-6 pl-4">
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.6rem" }}
              className="w-20"
            />

            <Skeleton variant="rounded" width={"100%"} height={"240px"} />
          </div>
        </div>
        <div className="pt-10 flex flex-col gap-8">
          <div className="flex flex-row gap-8">
            <Skeleton variant="rounded" height={32} width={32} />
            <Skeleton variant="rounded" height={32} width={32} />
            <Skeleton variant="rounded" height={32} width={32} />
          </div>
          <div className="flex flex-col">
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.2rem" }}
              className="w-20"
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.8rem" }}
              className="w-16"
            />
          </div>
          <div className="flex flex-col">
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.2rem" }}
              className="w-20"
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.8rem" }}
              className="w-16"
            />
          </div>
          <div className="flex flex-col">
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.2rem" }}
              className="w-20"
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.8rem" }}
              className="w-16"
            />
          </div>
          <div className="flex flex-col">
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.2rem" }}
              className="w-20"
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.8rem" }}
              className="w-16"
            />
          </div>
          <div>
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.3rem" }}
              className="w-20"
            />
            <div className="flex flex-wrap w-full gap-2">
              {cast.map((item, i) => (
                <Skeleton
                  key={i}
                  variant="text"
                  sx={{ fontSize: "1.2rem" }}
                  className="w-14"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
