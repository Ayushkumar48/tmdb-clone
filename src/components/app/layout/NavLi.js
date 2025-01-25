export default function NavLi({ data, children }) {
  return (
    <div className="group relative cursor-pointer">
      <a className="menu-hover text-white text-lg font-semibold">{children}</a>

      <div className="invisible absolute left-0 right-0 h-5 group-hover:visible" />

      <div className="invisible absolute top-9 z-50 flex gap-1 rounded-lg overflow-hidden flex-col w-40 bg-gray-100 text-gray-800 shadow-xl group-hover:visible left-1/2 -translate-x-1/2">
        {data.lists.map((item, i) => (
          <a
            key={i}
            className="block border-b border-gray-100 px-4 py-2 font-[550] text-[16px] hover:bg-gray-300 w-full text-gray-800 active:bg-[#01b3e4] active:text-white"
            href={item.href}
          >
            {item.menuItem}
          </a>
        ))}
      </div>
    </div>
  );
}
