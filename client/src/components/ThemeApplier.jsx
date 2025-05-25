import React, { useEffect } from "react";
import { useThemeStore } from "../store/useThemeStore";

const ThemeApplier = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return null;
};

export default ThemeApplier;
