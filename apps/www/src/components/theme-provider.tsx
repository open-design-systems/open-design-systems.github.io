"use client";
import { createContext, useContext, useEffect, useState } from "react";

type SystemTheme = "dark" | "light" | "system";
type Theme = "dark" | "light";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: SystemTheme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: SystemTheme;
  setTheme: (theme: SystemTheme) => void;
  getThemeScheme: (theme: SystemTheme) => Theme;
};

const getThemeScheme = (theme: SystemTheme) => {
  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    return systemTheme;
  }

  return theme;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  getThemeScheme,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ods-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<SystemTheme>(defaultTheme);

  useEffect(() => {
    if (window !== null) {
      setTheme(
        () => (localStorage.getItem(storageKey) as SystemTheme) || defaultTheme,
      );
    }
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    const systemTheme = getThemeScheme(theme);

    root.classList.add(systemTheme);
  }, [theme]);

  const value = {
    theme,
    getThemeScheme,
    setTheme: (theme: SystemTheme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
