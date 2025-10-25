import { useEffect, useState } from 'react';

export enum Theme {
  DARK = 'DARK',
  LIGHT = 'LIGHT'
}

const LOCAL_STORAGE_THEME = 'theme'

export default function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem(LOCAL_STORAGE_THEME) || Theme.LIGHT);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_THEME, theme);
    document.documentElement.classList.toggle('dark', theme === Theme.DARK);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  return { theme, toggleTheme }
}