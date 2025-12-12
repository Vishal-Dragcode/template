// Footer.js
import React from 'react';
import { useTheme } from '../Settings/themeUtils';

const Footer = () => {
  const { themeUtils } = useTheme();

  return (
    <footer className="py-4 px-2 border-t" style={{ 
      backgroundColor: themeUtils.getBgColor('card'),
      borderColor: themeUtils.getBorderColor()
    }}>
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm" style={{ color: themeUtils.getTextColor(false) }}>
          © 2025 RajYug IT Solutions LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;