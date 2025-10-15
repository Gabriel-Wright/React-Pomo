interface CheckBoxInputProps {
  label: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

function CheckBoxInput({ label, isChecked, onChange }: CheckBoxInputProps) {
  return (
    <div className="checkbox-input">
      <span className="checkbox-label">{label}</span>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
}
export default CheckBoxInput;
