import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Toggle from "react-toggle";
import 'react-toggle/style.css'

const DARK_CLASS = "dark";
const LIGHT_CLASS = "light"

 const DarkToggle = () => {
  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)"
    },
    undefined,
    prefersDark => {
      setIsDark(prefersDark);
    }
  );

  const [isDark, setIsDark] = useState(systemPrefersDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove(LIGHT_CLASS)
      document.documentElement.classList.add(DARK_CLASS)
    } else {
      document.documentElement.classList.remove(DARK_CLASS)
      document.documentElement.classList.add(LIGHT_CLASS)
    }
  }, [isDark]);

  return (
    <Toggle
      className="DarkToggle"
      checked={isDark}
      onChange={event => setIsDark(event.target.checked)}
      icons={false}
      aria-label="Dark mode"
    />
  );
};

export default DarkToggle
