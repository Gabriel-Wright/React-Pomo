import ColorBoxPreview from "./ColorBoxPreview";

interface ThemeItemProps {
  themeId: number;
  workBg: string;
  breakBg: string;
  onClick?: () => void;
}

const ThemeItem = ({ themeId, workBg, breakBg, onClick }: ThemeItemProps) => {
  return (
    <button className="dropdown-item" onClick={onClick}>
      <ColorBoxPreview color={workBg} />
      <ColorBoxPreview color={breakBg} />
    </button>
  );
};

export default ThemeItem;
