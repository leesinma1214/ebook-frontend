import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { type FC, useState } from "react";
import { HiColorSwatch } from "react-icons/hi";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export type ThemeModes = "light" | "dark";

interface Props {
  onThemeSelect?(mode: ThemeModes): void;
}

const ThemeOptions: FC<Props> = ({ onThemeSelect }) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeModes>("light");

  const handleThemeSelect = (mode: ThemeModes) => {
    setSelectedTheme(mode);
    if (onThemeSelect) {
      onThemeSelect(mode);
    }
  };

  return (
    <Popover showArrow offset={20}>
      <PopoverTrigger>
        <Button variant="light" isIconOnly>
          <HiColorSwatch size={30} />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="dark:bg-book-dark dark:text-book-dark">
        <div className="p-2">
          <p className="text-sm font-semibold mb-3 px-2">Theme</p>
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleThemeSelect("light")}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                selectedTheme === "light"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-default-100"
              }`}
            >
              <MdLightMode size={20} />
              <span>Light</span>
            </button>
            <button
              onClick={() => handleThemeSelect("dark")}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                selectedTheme === "dark"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-default-100"
              }`}
            >
              <MdDarkMode size={20} />
              <span>Dark</span>
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeOptions;
