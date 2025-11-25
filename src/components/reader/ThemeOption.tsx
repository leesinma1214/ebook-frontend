import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { type FC } from "react";
import { HiColorSwatch } from "react-icons/hi";

interface Props {
  onThemeSelect?(mode: "light" | "dark"): void;
}

const ThemeOptions: FC<Props> = ({ onThemeSelect }) => {
  return (
    <Popover showArrow offset={20}>
      <PopoverTrigger>
        <Button variant="light" isIconOnly>
          <HiColorSwatch size={30} />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <div className="flex items-center justify-center space-x-3 p-3">
          <button onClick={() => onThemeSelect && onThemeSelect("light")}>
            Sáng
          </button>
          <button onClick={() => onThemeSelect && onThemeSelect("dark")}>
            Tối
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeOptions;
