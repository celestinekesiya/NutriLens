import { useState, useEffect } from 'react';

const colorThemes = {
  forest: '#006110',
  ocean: '#0066cc',
  royal: '#6b21a8',
  crimson: '#dc2626',
  sunset: '#ea580c',
  slate: '#374151'
};

const THEME_STORAGE_KEY = 'nutrilens-color-theme';

export function useColorTheme() {
  const [currentTheme, setCurrentTheme] = useState<string>('forest');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme && savedTheme in colorThemes) {
      setCurrentTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  // Apply theme to CSS variables
  const applyTheme = (themeName: string) => {
    const color = colorThemes[themeName as keyof typeof colorThemes];
    if (color) {
      document.documentElement.style.setProperty('--text-color', color);
    }
  };

  // Change theme
  const changeTheme = (themeName: string) => {
    if (themeName in colorThemes) {
      setCurrentTheme(themeName);
      applyTheme(themeName);
      localStorage.setItem(THEME_STORAGE_KEY, themeName);
    }
  };

  return {
    currentTheme,
    changeTheme,
    availableThemes: Object.keys(colorThemes)
  };
}