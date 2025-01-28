/* eslint-disable @next/next/no-html-link-for-pages */
import * as React from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Drawer from "@mui/joy/Drawer";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import ModalClose from "@mui/joy/ModalClose";
import Menu from "@mui/icons-material/Menu";
import Search from "@mui/icons-material/Search";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
} from "@mui/joy";

export default function MobileNavbar() {
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
    {
      name: "Add",
      lists: [
        { href: "#", menuItem: "Add New Movie" },
        { href: "#", menuItem: "Add new TV Show" },
      ],
    },
  ];

  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <IconButton
        variant="outlined"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            ml: "auto",
            mt: 1,
            mr: 2,
          }}
        >
          <Typography
            component="label"
            htmlFor="close-icon"
            sx={{ fontSize: "sm", fontWeight: "lg", cursor: "pointer" }}
          >
            Close
          </Typography>
          <ModalClose id="close-icon" sx={{ position: "initial" }} />
        </Box>
        <Input
          size="sm"
          placeholder="Search"
          variant="plain"
          endDecorator={<Search />}
          slotProps={{
            input: {
              "aria-label": "Search anything",
            },
          }}
          sx={{
            m: 3,
            borderRadius: 0,
            borderBottom: "2px solid",
            borderColor: "neutral.outlinedBorder",
            "&:hover": {
              borderColor: "neutral.outlinedHoverBorder",
            },
            "&::before": {
              border: "1px solid var(--Input-focusedHighlight)",
              transform: "scaleX(0)",
              left: 0,
              right: 0,
              bottom: "-2px",
              top: "unset",
              transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
              borderRadius: 0,
            },
            "&:focus-within::before": {
              transform: "scaleX(1)",
            },
          }}
        />
        <AccordionGroup>
          <Accordion>
            <AccordionSummary>
              <a href="/">Home</a>
            </AccordionSummary>
          </Accordion>
          {navlis.map((item, i) => (
            <Accordion key={i}>
              <AccordionSummary>{item.name}</AccordionSummary>
              {item.lists.map((d, j) => (
                <AccordionDetails
                  key={j}
                  className="hover:text-white hover:bg-[#01b4e4] pl-8 flex items-center"
                >
                  <a href={d.href}>{d.menuItem}</a>
                </AccordionDetails>
              ))}
            </Accordion>
          ))}
        </AccordionGroup>
      </Drawer>
    </React.Fragment>
  );
}
