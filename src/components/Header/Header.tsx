import { useEffect, useRef, useState } from "react";
import ThemeDropdown from "./ThemeDropdown";
import type { PomodoroSettings } from "../../config";

interface HeaderProps {
  settings: PomodoroSettings;
  setSettings: React.Dispatch<React.SetStateAction<PomodoroSettings>>;
}

function Header({ settings, setSettings }: HeaderProps) {
  const [open, setOpen] = useState(false);

  let dropDownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let handler = (event: MouseEvent) => {
      if (!dropDownRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="header">
      <h1 className="title">POMODORO</h1>
      <div className="dropdown" ref={dropDownRef}>
        {/* <ColorPickerButton id="theme-button" onClick={() => setOpen(!open)} /> */}
        <h4 className="dropdown-btn" onClick={() => setOpen(!open)}>
          Themes
        </h4>
        {open && (
          <ThemeDropdown settings={settings} setSettings={setSettings} />
        )}
      </div>
    </div>
  );
}

export default Header;
