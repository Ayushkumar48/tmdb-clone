import { AccountCircle } from "@mui/icons-material";
import { Divider } from "@mui/material";
export default function Profile() {
  const data1 = [
    {
      href: "#",
      menuItem: "Discussions",
    },
    {
      href: "#",
      menuItem: "Lists",
    },
    {
      href: "#",
      menuItem: "Ratings",
    },
    {
      href: "#",
      menuItem: "Watchlist",
    },
  ];
  const data2 = [
    {
      href: "#",
      menuItem: "Edit Profile",
    },
    {
      href: "#",
      menuItem: "Settings",
    },
  ];
  return (
    <div className="group relative cursor-pointer">
      <a className="menu-hover text-sm text-white">
        <AccountCircle className="scale-125" />
      </a>

      <div className="invisible absolute left-0 right-0 h-4 group-hover:visible" />

      <div className="invisible absolute top-8 z-50 left-1/2 -translate-x-1/2 flex gap-[2px] rounded-lg px-2 py-1 flex-col w-40 bg-gray-100 text-gray-800 shadow-xl group-hover:visible">
        <a
          className="block border-b border-gray-100 py-1 text-[13px] text-gray-500 hover:text-black md:mx-2"
          href="#"
        >
          <div className="text-black font-bold">Ayushkumar48</div>
          <div className="text-[10px] text-gray-400">View Profile</div>
        </a>
        <Divider />
        {data1.map((item, i) => (
          <a
            key={i}
            className="block border-b border-gray-100 py-1 font-[550] text-[13px] text-gray-500 hover:text-black md:mx-2"
            href={item.href}
          >
            {item.menuItem}
          </a>
        ))}
        <Divider />
        {data2.map((item, i) => (
          <a
            key={i}
            className="block border-b border-gray-100 py-1 font-[550] text-[13px] text-gray-500 hover:text-black md:mx-2"
            href={item.href}
          >
            {item.menuItem}
          </a>
        ))}
        <Divider />
        <a
          className="block border-b border-gray-100 py-1 font-[550] text-[13px] text-gray-500 hover:text-black md:mx-2"
          href="#"
        >
          Logout
        </a>
      </div>
    </div>
  );
}
