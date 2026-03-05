export type Theme = "dark" | "light" | "glass";

export function getTheme(): Theme {
  const env = (process.env.NEXT_PUBLIC_THEME || "").trim();
  if (env === "light" || env === "glass" || env === "dark") return env;
  return "dark";
}
