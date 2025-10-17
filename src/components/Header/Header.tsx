import { useRef, useState } from "react";
import ThemeDropdown from "./ThemeDropdown";
import type { PomodoroSettings } from "../../config";

interface HeaderProps {
  settings: PomodoroSettings;
  setSettings: React.Dispatch<React.SetStateAction<PomodoroSettings>>;
}

function Header({ settings, setSettings }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="header">
      <h1 className="title">POMODORO</h1>
      <div className="dropdown">
        {/* <ColorPickerButton id="theme-button" onClick={() => setOpen(!open)} /> */}
        <div className="dropdown-btn" onClick={() => setOpen(!open)}>
          Themes
        </div>
        {open && (
          <ThemeDropdown settings={settings} setSettings={setSettings} />
        )}
      </div>
    </div>
  );
}

export default Header;
