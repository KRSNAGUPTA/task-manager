import React, { useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import { useTheme } from "@/context/ThemeContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();


  const baseBackground = "bg-white dark:bg-black";
  const iconColor = "text-black dark:text-white";
  const opacityBackground = "bg-opacity-20 dark:bg-opacity-20";

  return (
    <div className="flex justify-center pt-4 max-w-screen">
      <header
        className={`rounded-lg  shadow-sm backdrop-filter backdrop-blur-lg max-w-5xl w-full  ${opacityBackground} ${baseBackground}`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
         
          <a href="/" className="text-2xl font-bold text-black dark:text-white">
            Task Manager
          </a>

          <div className=" md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`focus:outline-none ${iconColor}`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Brightness2Icon /> : <LightModeIcon />}
            </button>
            <a
              href="https://github.com/KRSNAGUPTA/task-manager"
              target="_blank"
              rel="noopener noreferrer"
              className={iconColor}
            >
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/krishnaagupta"
              target="_blank"
              rel="noopener noreferrer"
              className={iconColor}
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
