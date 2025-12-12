// themeUtils.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    mode: "Light",
    headerBg: "#3b82f6",
    navbarBg: "#93c5fd",
    mood: "Day",
    activeColorCategory: "primary"
  });

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    }
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('appTheme', JSON.stringify(theme));
  }, [theme]);

  // Apply theme to document root for global CSS variables
  useEffect(() => {
    const root = document.documentElement;
    
    // Set CSS variables based on theme
    root.style.setProperty('--header-bg', theme.headerBg);
    root.style.setProperty('--navbar-bg', theme.navbarBg);
    root.style.setProperty('--text-color', theme.mode === "Light" ? "#000000" : 
                          theme.mode === "Dark" ? "#FFFFFF" : 
                          getTextColor(theme.headerBg));
    
    // Set body classes for mood and mode
    document.body.className = document.body.className
      .replace(/mood-\w+/g, '')
      .replace(/mode-\w+/g, '')
      .trim();
    
    document.body.classList.add(`mood-${theme.mood.toLowerCase()}`);
    document.body.classList.add(`mode-${theme.mode.toLowerCase()}`);
  }, [theme]);

  const updateTheme = (newTheme) => {
    setTheme(prevTheme => ({ ...prevTheme, ...newTheme }));
  };

  const getTextColor = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  };

  // Enhanced theme utilities for consistent application
  const themeUtils = {
    // Get text color based on theme mode
    getTextColor: (isPrimary = true) => {
      if (theme.mode === "Dark") {
        return isPrimary ? "#FFFFFF" : "#E5E7EB";
      } else {
        return isPrimary ? "#1F2937" : "#6B7280";
      }
    },
    
    // Get background color for components
    getBgColor: (variant = 'default') => {
      if (variant === 'card') {
        return theme.mood === "Day" ? "#FFFFFF" : "#1F2937";
      } else if (variant === 'input') {
        return theme.mood === "Day" ? "#F9FAFB" : "#374151";
      } else if (variant === 'hover') {
        return theme.mood === "Day" ? "#F3F4F6" : "#374151";
      }
      return theme.mood === "Day" ? "#F9FAFB" : "#111827";
    },
    
    // Get border color
    getBorderColor: () => {
      return theme.mood === "Day" ? "#E5E7EB" : "#374151";
    },
    
    // Get gradient background
    getBgGradient: () => {
      return theme.mood === "Day" 
        ? "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
        : "bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-950";
    },
    
    // Get styles for interactive elements
    getInteractiveStyles: (variant = 'primary') => {
      if (variant === 'primary') {
        return {
          backgroundColor: theme.headerBg,
          color: getTextColor(theme.headerBg),
          hoverBg: theme.mode === "Dark" ? `${theme.headerBg}dd` : `${theme.headerBg}cc`
        };
      } else if (variant === 'secondary') {
        return {
          backgroundColor: theme.navbarBg,
          color: getTextColor(theme.navbarBg),
          hoverBg: theme.mode === "Dark" ? `${theme.navbarBg}dd` : `${theme.navbarBg}cc`
        };
      }
      return {
        backgroundColor: themeUtils.getBgColor('default'),
        color: themeUtils.getTextColor(true),
        hoverBg: themeUtils.getBgColor('hover')
      };
    }
  };

  const textColor = theme.mode === "Light" 
    ? "#000000" 
    : theme.mode === "Dark" 
    ? "#FFFFFF" 
    : getTextColor(theme.headerBg);

  const bgGradient = theme.mood === "Day" 
    ? "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
    : "bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-950";

  const cardBg = theme.mood === "Day" ? "bg-white" : "bg-gray-800";
  const textMain = theme.mood === "Day" ? "text-gray-900" : "text-white";
  const textSecondary = theme.mood === "Day" ? "text-gray-600" : "text-gray-300";
  const borderColor = theme.mood === "Day" ? "border-gray-200" : "border-gray-700";
  const hoverBg = theme.mood === "Day" ? "hover:bg-gray-50" : "hover:bg-gray-700";

  const themeClasses = {
    bgGradient,
    cardBg,
    textMain,
    textSecondary,
    borderColor,
    hoverBg,
    textColor
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      updateTheme, 
      themeClasses,
      themeUtils
    }}>
      {children}
    </ThemeContext.Provider>
  );
};