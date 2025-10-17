import type { PomodoroSettings } from "../../config";
import { THEMES, type ThemeId } from "../../themes";
import ThemeItem from "./ThemeItem";

interface ThemeDropdownProps {
  settings: PomodoroSettings;
  setSettings: React.Dispatch<React.SetStateAction<PomodoroSettings>>;
}

const ThemeDropdown = ({ settings, setSettings }: ThemeDropdownProps) => {
  return (
    <div className="theme-dropdown-menu">
      {Object.entries(THEMES).map(([id, color]) => {
        const themeId = Number(id) as ThemeId;
        return (
          <ThemeItem
            key={themeId}
            themeId={themeId}
            workBg={color.workBg}
            breakBg={color.breakBg}
            onClick={() => setSettings((prev) => ({ ...prev, theme: themeId }))}
          />
        );
      })}{" "}
    </div>
  );
};

export default ThemeDropdown;
