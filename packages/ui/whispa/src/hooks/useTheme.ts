import { useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';
export type Theme = 'light' | 'dark';

export function useTheme() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    // Get saved theme from localStorage or default to 'system'
    const saved = localStorage.getItem('theme-mode');
    return (saved as ThemeMode) || 'system';
  });
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const applyTheme = (mode: ThemeMode) => {
      let finalTheme: Theme;
      
      if (mode === 'system') {
        finalTheme = mediaQuery.matches ? 'dark' : 'light';
      } else {
        finalTheme = mode;
      }
      
      setTheme(finalTheme);
      
      if (finalTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Apply initial theme
    applyTheme(themeMode);

    // Listen for system theme changes (only if mode is 'system')
    const handleChange = (e: MediaQueryListEvent) => {
      if (themeMode === 'system') {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [themeMode]);

  const changeThemeMode = (mode: ThemeMode) => {
    setThemeMode(mode);
    localStorage.setItem('theme-mode', mode);
  };

  return { theme, themeMode, setThemeMode: changeThemeMode };
}
