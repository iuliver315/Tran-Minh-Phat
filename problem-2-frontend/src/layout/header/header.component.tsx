import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { useThemeContext } from "@/contexts/theme.context";

const Header = () => {
  const { toggleDarkMode, isDarkMode } = useThemeContext();

  return (
    <header className="py-4 px-2 md:-6 relative">
      <h1 className={"text-2xl md:text-4xl text-center text-primary"}>
        Currency Convertor
      </h1>
      <button
        onClick={toggleDarkMode}
        className="absolute top-1 right-1 md:top-3  md:right-3 text-sm md:text-2xl"
        title={`Switch between dark and light (currently light mode)`}
      >
        {!isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
      </button>
    </header>
  );
};
export default Header;
