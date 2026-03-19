import { useState, useEffect } from "react";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

type Breakpoint = keyof typeof breakpoints;

export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const [matches, setMatches] = useState(
    () => window.matchMedia(`(min-width: ${breakpoints[breakpoint]}px)`).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(min-width: ${breakpoints[breakpoint]}px)`
    );

    const handleChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [breakpoint]);

  return matches;
}
