import React, { createContext, useState, useEffect, useContext } from "react";
import { Sun, Moon } from "lucide-react"; // ← Added for toggle icons

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

// Default color from index 0 of your palette
const defaultColor = { dark: "#3b82f6", light: "#93c5fd" };

const defaultTheme = {
  mode: "Dark",
  headerBg: defaultColor.dark,
  navbarBg: defaultColor.light,
  mood: "Night",
  activeColorCategory: "primary",
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const saved = localStorage.getItem("Theme");
    if (saved) {
      try {
        setTheme({ ...defaultTheme, ...JSON.parse(saved) });
      } catch {
        setTheme(defaultTheme);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Theme", JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--header-bg", theme.headerBg);
    root.style.setProperty("--navbar-bg", theme.navbarBg);

    document.body.className = document.body.className
      .replace(/mood-\w+/g, "")
      .replace(/mode-\w+/g, "")
      .trim();
    document.body.classList.add(`mood-${theme.mood.toLowerCase()}`);
    document.body.classList.add(`mode-${theme.mode.toLowerCase()}`);
  }, [theme]);

  const updateTheme = (newTheme) => {
    setTheme((prev) => ({ ...prev, ...newTheme }));
  };

  // New: Toggle between Light and Dark mode
  const toggleThemeMode = () => {
    setTheme((prev) => ({
      ...prev,
      mode: prev.mode === "Dark" ? "Light" : "Dark",
      mood: prev.mode === "Dark" ? "Day" : "Night",
    }));
  };

  const getTextColor = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return l > 0.5 ? "#000000" : "#FFFFFF";
  };

  const themeUtils = {
    getTextColor: (isPrimary = true) => {
      return theme.mode === "Dark"
        ? isPrimary
          ? "#FFFFFF"
          : "#E5E7EB"
        : isPrimary
        ? "#1F2937"
        : "#6B7280";
    },
    getBgColor: (variant = "default") => {
      if (variant === "card")
        return theme.mood === "Day" ? "#FFFFFF" : "#1F2937";
      if (variant === "input")
        return theme.mood === "Day" ? "#F9FAFB" : "#374151";
      if (variant === "hover")
        return theme.mood === "Day" ? "#F3F4F6" : "#374151";
      return theme.mood === "Day" ? "#F9FAFB" : "#111827";
    },
    getBorderColor: () => (theme.mood === "Day" ? "#E5E7EB" : "#374151"),
    getBgGradient: () =>
      theme.mood === "Day"
        ? "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
        : "bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-950",
  };

  // Premium Theme Toggle Button
  const ThemeToggleButton = () => (
    <button
      onClick={toggleThemeMode}
      className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-inner ${
        theme.mode === "Dark"
          ? "bg-gray-700 focus:ring-gray-600"
          : ""
      }`}
      style={{
        backgroundColor: theme.mode === "Dark" ? undefined : (theme.headerBg || "#3b82f6")
      }}
      aria-label="Toggle dark/light mode"
    >
      {/* Track Background Icons */}
      <div className="absolute w-full flex justify-between px-1.5 pointer-events-none">
        <Moon className={`w-4 h-4 transition-opacity duration-300 ${theme.mode === "Dark" ? "opacity-100 text-gray-400" : "opacity-0"}`} />
        <Sun className={`w-4 h-4 transition-opacity duration-300 ${theme.mode === "Dark" ? "opacity-0" : "opacity-100"} ${
          themeUtils.getTextColor(theme.headerBg) === "#FFFFFF" ? "text-white/60" : "text-black/40"
        }`} />
      </div>

      {/* Sliding Knob */}
      <span
        className={`z-10 flex items-center justify-center w-6 h-6 transform transition-transform duration-500 ease-in-out rounded-full shadow-md bg-white ${
          theme.mode === "Dark" ? "translate-x-9" : "translate-x-1"
        }`}
      >
        {theme.mode === "Dark" ? (
          <Moon className="w-4 h-4 text-gray-800" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
      </span>
    </button>
  );

  return (
    <ThemeContext.Provider
      value={{ theme, updateTheme, themeUtils, ThemeToggleButton }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
