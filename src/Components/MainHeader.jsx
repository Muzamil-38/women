import React, { useEffect, useState } from "react";
import { FaAngleDown, FaRegSun, FaMoon } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";

const MainHeader = ({ toggleSidebar }) => {
  console.log("Toogle sidebar",toggleSidebar)
  const options = [
    {
      icon: FaRegSun,
      text: "light",
    },
    {
      icon: FaMoon,
      text: "dark",
    },
  ];

  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const element = document.documentElement;

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");

        break;

      default:
        localStorage.removeItem("theme");
        break;
    }
  }, [theme, element.classList]);

  return (
    <div className="m-4 h-8  flex justify-between items-center">
    <MdOutlineMenu onClick={toggleSidebar} className="cursor-pointer font-bold text-3xl dark:text-textColor-dark"/>
      <h1 className="flex items-end font-bold text-2xl hover:bg-hoverColor-light dark:hover:bg-hoverColor-dark dark:hover:text-textColor-dark dark:text-textColor-dark p-2 cursor-pointer rounded-full">
        Women2Women <FaAngleDown />
      </h1>

      <div className="flex gap-2 rounded-full bg-pink-400 p-1">
        {options?.map((opt) => (
          <button
            key={opt.text}
            onClick={() => setTheme(opt.text)}
            className={`hover:bg-pink-200 p-1 rounded-full ${
              theme === opt.text && "bg-pink-200"
            }`}
          >
            <opt.icon className="h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default MainHeader;
