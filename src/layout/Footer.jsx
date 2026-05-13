// Footer.js
import React from 'react';
import { useTheme } from '../ui/Settings/themeUtils';

const Footer = () => {
  const { themeUtils } = useTheme();

  return (
    <footer 
      className="border-t py-3 mt-auto"
      style={{ 
        backgroundColor: themeUtils.getBgColor('card'),
        borderColor: themeUtils.getBorderColor()
      }}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-center px-2">
        <p className="text-sm" style={{ color: themeUtils.getTextColor(false) }}>
          © 2025 RajYug IT Solutions LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;