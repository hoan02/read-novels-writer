"use client";

const Sidebar = () => {
  return (
    <div className="w-[260px] h-full fixed border-r-2 flex flex-col p-4">
      <div className="h-[60px]">Logo</div>
      <div className="grow">Menu</div>
      <div>bottom</div>
    </div>
  );
};

export default Sidebar;
