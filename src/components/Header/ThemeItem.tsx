import ColorBoxPreview from "./ColorBoxPreview";

interface ThemeItemProps {
  workBg: string;
  breakBg: string;
  onClick?: () => void;
  active: boolean;
}

const ThemeItem = ({ workBg, breakBg, onClick, active }: ThemeItemProps) => {
  return (
    <button
      className={"dropdown-item" + (active ? " active-theme" : "")} //unsure how to style active theme
      onClick={onClick}
    >
      <ColorBoxPreview color={workBg} />
      <ColorBoxPreview color={breakBg} />
    </button>
  );
};

export default ThemeItem;
