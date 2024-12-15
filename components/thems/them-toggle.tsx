import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const handleToggle = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex items-center justify-center transition-colors duration-300">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={handleToggle}
          className="sr-only peer"
        />
        <div className="w-[54px] h-8 bg-gray-200 rounded-md  peer-focus:ring-gray-400 dark:peer-focus:ring-white dark:bg-gray-700 peer-checked:bg-primary"></div>
        <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-md transition-transform duration-200 peer-checked:translate-x-5 text-center">
          {isDarkMode ? (
            <Moon size={24} />
          ) : (
            <span className="text-primary">
              <Sun size={24} />
            </span>
          )}
        </span>
      </label>
    </div>
  );
}

export default ThemeToggle;
