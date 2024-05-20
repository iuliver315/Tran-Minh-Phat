/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect, createContext } from "react";
import { LocalStorage } from "@/constants/browser.constant";
import useLocalStorage from "@/hooks/useLocalStorage.hook";
import useSound from "@/hooks/useSound.hook";
import themeSwitchAudio from "../assets/audio/lamp_switch.mp3";
interface IThemeContext {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}
const ThemeContext = createContext<null | IThemeContext>(null);

const isUserDarkTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage(
    LocalStorage.isDarkMode,
    isUserDarkTheme
  );
  const { play } = useSound(themeSwitchAudio);
  const toggleDarkMode = () => {
    setIsDarkMode((prev: boolean) => !prev);
    play();
  };
  useEffect(() => {
    const htmlEl = document.documentElement;
    if (isDarkMode) {
      htmlEl.classList.add("dark");
      htmlEl.classList.remove("light-mode");
      return;
    }
    htmlEl.classList.add("light-mode");
    htmlEl.classList.remove("dark");
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ toggleDarkMode, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error(
      "You're using theme context outside of theme context provider"
    );
  return ctx;
};
export default ThemeContextProvider;
