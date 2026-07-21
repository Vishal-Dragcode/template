// Footer.js
import React from 'react';
import { useTheme } from '../ui/Settings/themeUtils';

const Footer = () => {
  const { themeUtils } = useTheme();

  return (
    <footer 
      className="border-t py-2 mt-auto transition-colors duration-300"
      style={{ 
        backgroundColor: themeUtils.getBgColor('card'),
        borderColor: themeUtils.getBorderColor()
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center px-4">
        <p 
          className="text-xs tracking-wide opacity-80 hover:opacity-100 transition-opacity duration-300" 
          style={{ color: themeUtils.getTextColor(false) }}
        >
          &copy; {new Date().getFullYear()} <span className="font-semibold">RajYug IT Solutions LLC.</span> All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;