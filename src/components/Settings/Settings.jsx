// Settings.js - Plain Background Version
import React, { useState } from "react";
import { 
  ChevronDown, 
  Palette, 
  Sun, 
  Moon, 
  Check, 
  Droplet, 
  Zap,
  Eye
} from "lucide-react";
import { useTheme } from "./themeUtils";

const Settings = () => {
  const { theme, updateTheme, themeUtils } = useTheme();
  
  const [isThemeOpen, setIsThemeOpen] = useState(true);
  const [isMoodOpen, setIsMoodOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);

  // Expanded color palettes with more options
  const colorPalettes = [
    // Primary Colors
    { dark: "#3b82f6", light: "#93c5fd", name: "Blue", category: "primary" },
    { dark: "#8b5cf6", light: "#c4b5fd", name: "Purple", category: "primary" },
    { dark: "#ec4899", light: "#f9a8d4", name: "Pink", category: "primary" },
    { dark: "#f59e0b", light: "#fcd34d", name: "Orange", category: "primary" },
    { dark: "#10b981", light: "#6ee7b7", name: "Green", category: "primary" },
    { dark: "#ef4444", light: "#fca5a5", name: "Red", category: "primary" },
    
    // Secondary Colors
    { dark: "#06b6d4", light: "#67e8f9", name: "Cyan", category: "secondary" },
    { dark: "#6366f1", light: "#a5b4fc", name: "Indigo", category: "secondary" },
    { dark: "#14b8a6", light: "#5eead4", name: "Teal", category: "secondary" },
    { dark: "#f97316", light: "#fdba74", name: "Amber", category: "secondary" },
    { dark: "#84cc16", light: "#bef264", name: "Lime", category: "secondary" },
    { dark: "#a855f7", light: "#d8b4fe", name: "Violet", category: "secondary" },
    
    // Neutral Colors
    { dark: "#1f2937", light: "#9ca3af", name: "Gray", category: "neutral" },
    { dark: "#4b5563", light: "#d1d5db", name: "Slate", category: "neutral" },
    { dark: "#374151", light: "#e5e7eb", name: "Zinc", category: "neutral" },
    { dark: "#1e293b", light: "#cbd5e1", name: "Stone", category: "neutral" },
    { dark: "#18181b", light: "#a1a1aa", name: "Neutral", category: "neutral" },
    
    // Special Colors
    { dark: "#0f172a", light: "#e2e8f0", name: "Midnight", category: "special" },
    { dark: "#581c87", light: "#e9d5ff", name: "Royal", category: "special" },
    { dark: "#14532d", light: "#dcfce7", name: "Forest", category: "special" },
    { dark: "#7c2d12", light: "#fed7aa", name: "Terracotta", category: "special" },
    { dark: "#831843", light: "#fce7f3", name: "Rose", category: "special" },
  ];

  const handleModeChange = (mode) => {
    updateTheme({ mode });
  };

  const handleColorChange = (color) => {
    updateTheme({
      headerBg: color.dark,
      navbarBg: color.light,
    });
  };

  const handleMoodChange = (newMood) => {
    updateTheme({ mood: newMood });
  };

  // Group colors by category
  const groupedColors = colorPalettes.reduce((acc, color) => {
    if (!acc[color.category]) acc[color.category] = [];
    acc[color.category].push(color);
    return acc;
  }, {});

  return (
    // Changed from gradient to plain background
    <div className="min-h-screen py-8 px-4 transition-all duration-500" style={{ backgroundColor: themeUtils.getBgColor('default') }}>
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          
          {/* Text Color Mode Section */}
          <div className={`${themeUtils.getBgColor('card')} border ${themeUtils.getBorderColor()} rounded-2xl shadow-lg overflow-hidden transition-all duration-300`}>
            <div
              className={`flex items-center justify-between cursor-pointer p-5 hover:bg-opacity-80 transition-colors`}
              style={{ backgroundColor: themeUtils.getBgColor('hover') }}
              onClick={() => setIsThemeOpen(!isThemeOpen)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                     style={{ backgroundColor: theme.headerBg }}>
                  <Droplet className="text-white" size={20} />
                </div>
                <h2 className="text-lg font-bold" style={{ color: themeUtils.getTextColor(true) }}>
                  Text Color Mode
                </h2>
              </div>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  isThemeOpen ? "rotate-180" : ""
                }`}
                size={24}
                style={{ color: themeUtils.getTextColor(false) }}
              />
            </div>

            {isThemeOpen && (
              <div className="p-6 border-t" style={{ borderColor: themeUtils.getBorderColor() }}>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    className={`px-6 py-4 rounded-xl text-sm font-semibold flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                      theme.mode === "Light"
                        ? "shadow-lg scale-105"
                        : ""
                    }`}
                    style={{
                      backgroundColor: theme.mode === "Light" ? theme.headerBg : themeUtils.getBgColor('default'),
                      color: theme.mode === "Light" ? '#fff' : themeUtils.getTextColor(false)
                    }}
                    onClick={() => handleModeChange("Light")}
                  >
                    <Sun size={24} />
                    <span>Light</span>
                    {theme.mode === "Light" && <Check size={16} />}
                  </button>
                  <button
                    className={`px-6 py-4 rounded-xl text-sm font-semibold flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                      theme.mode === "Dark"
                        ? "shadow-lg scale-105"
                        : ""
                    }`}
                    style={{
                      backgroundColor: theme.mode === "Dark" ? theme.headerBg : themeUtils.getBgColor('default'),
                      color: theme.mode === "Dark" ? '#fff' : themeUtils.getTextColor(false)
                    }}
                    onClick={() => handleModeChange("Dark")}
                  >
                    <Moon size={24} />
                    <span>Dark</span>
                    {theme.mode === "Dark" && <Check size={16} />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Background Mood Section */}
          <div className={`${themeUtils.getBgColor('card')} border ${themeUtils.getBorderColor()} rounded-2xl shadow-lg overflow-hidden transition-all duration-300`}>
            <div
              className={`flex items-center justify-between cursor-pointer p-5 hover:bg-opacity-80 transition-colors`}
              style={{ backgroundColor: themeUtils.getBgColor('hover') }}
              onClick={() => setIsMoodOpen(!isMoodOpen)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                     style={{ backgroundColor: theme.headerBg }}>
                  {theme.mood === "Day" ? <Sun className="text-white" size={20} /> : <Moon className="text-white" size={20} />}
                </div>
                <h2 className="text-lg font-bold" style={{ color: themeUtils.getTextColor(true) }}>
                  Background Mood
                </h2>
              </div>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  isMoodOpen ? "rotate-180" : ""
                }`}
                size={24}
                style={{ color: themeUtils.getTextColor(false) }}
              />
            </div>

            {isMoodOpen && (
              <div className="p-6 border-t" style={{ borderColor: themeUtils.getBorderColor() }}>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className={`px-6 py-6 rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
                      theme.mood === "Day"
                        ? "shadow-xl scale-105"
                        : ""
                    }`}
                    style={{
                      backgroundColor: theme.mood === "Day" ? theme.headerBg : themeUtils.getBgColor('default'),
                      color: theme.mood === "Day" ? '#fff' : themeUtils.getTextColor(false)
                    }}
                    onClick={() => handleMoodChange("Day")}
                  >
                    <Sun size={32} />
                    <span className="font-bold text-lg">Day Mode</span>
                    {theme.mood === "Day" && <Check size={16} />}
                  </button>
                  <button
                    className={`px-6 py-6 rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
                      theme.mood === "Night"
                        ? "shadow-xl scale-105"
                        : ""
                    }`}
                    style={{
                      backgroundColor: theme.mood === "Night" ? theme.headerBg : themeUtils.getBgColor('default'),
                      color: theme.mood === "Night" ? '#fff' : themeUtils.getTextColor(false)
                    }}
                    onClick={() => handleMoodChange("Night")}
                  >
                    <Moon size={32} />
                    <span className="font-bold text-lg">Night Mode</span>
                    {theme.mood === "Night" && <Check size={16} />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Color Palette Section */}
          <div className={`${themeUtils.getBgColor('card')} border ${themeUtils.getBorderColor()} rounded-2xl shadow-lg overflow-hidden transition-all duration-300`}>
            <div
              className={`flex items-center justify-between cursor-pointer p-5 hover:bg-opacity-80 transition-colors`}
              style={{ backgroundColor: themeUtils.getBgColor('hover') }}
              onClick={() => setIsColorOpen(!isColorOpen)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                     style={{ backgroundColor: theme.headerBg }}>
                  <Palette className="text-white" size={20} />
                </div>
                <h2 className="text-lg font-bold" style={{ color: themeUtils.getTextColor(true) }}>
                  Color Palette
                </h2>
              </div>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  isColorOpen ? "rotate-180" : ""
                }`}
                size={24}
                style={{ color: themeUtils.getTextColor(false) }}
              />
            </div>

            {isColorOpen && (
              <div className="p-6 border-t" style={{ borderColor: themeUtils.getBorderColor() }}>
                {/* Color categories tabs */}
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                  {Object.keys(groupedColors).map((category) => (
                    <button
                      key={category}
                      className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                        theme.activeColorCategory === category
                          ? "shadow-md scale-105"
                          : ""
                      }`}
                      style={{
                        backgroundColor: theme.activeColorCategory === category ? theme.headerBg : themeUtils.getBgColor('default'),
                        color: theme.activeColorCategory === category ? '#fff' : themeUtils.getTextColor(false)
                      }}
                      onClick={() => updateTheme({ activeColorCategory: category })}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                {/* Color palette grid */}
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-3">
                  {(groupedColors[theme.activeColorCategory || "primary"] || groupedColors.primary).map((color, index) => (
                    <button
                      key={index}
                      className={`relative w-14 h-14 rounded-xl cursor-pointer transition-all duration-300 ${
                        theme.headerBg === color.dark
                          ? "ring-4 scale-110 shadow-lg"
                          : "hover:scale-105 shadow-md"
                      }`}
                      style={{
                        boxShadow: theme.headerBg === color.dark 
                          ? `0 0 0 4px ${theme.headerBg}40` 
                          : `0 4px 6px -1px rgba(0, 0, 0, 0.1)`
                      }}
                      onClick={() => handleColorChange(color)}
                      title={color.name}
                    >
                      <div className="w-full h-full rounded-xl overflow-hidden">
                        <div
                          className="w-full h-1/2"
                          style={{ backgroundColor: color.light }}
                        ></div>
                        <div
                          className="w-full h-1/2"
                          style={{ backgroundColor: color.dark }}
                        ></div>
                      </div>
                      {theme.headerBg === color.dark && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check className="text-white text-lg font-bold drop-shadow-lg" size={20} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <button
              className="px-6 py-3 rounded-lg font-medium transition-all"
              style={{
                backgroundColor: theme.headerBg,
                color: '#fff'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = theme.mode === "Dark" ? `${theme.headerBg}dd` : `${theme.headerBg}cc`;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = theme.headerBg;
              }}
              onClick={() => {
                // Reset to default theme
                updateTheme({
                  mode: "Light",
                  headerBg: "#3b82f6",
                  navbarBg: "#93c5fd",
                  mood: "Day",
                  activeColorCategory: "primary"
                });
              }}
            >
              Reset to Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;