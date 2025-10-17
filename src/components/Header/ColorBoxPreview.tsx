interface ColorBoxPreviewProps {
  color: string;
}

const ColorBoxPreview = ({ color }: ColorBoxPreviewProps) => {
  return (
    <div
      style={{
        width: "16px",
        height: "16px",
        background: color,
        borderRadius: "3px",
      }}
    />
  );
};

export default ColorBoxPreview;
