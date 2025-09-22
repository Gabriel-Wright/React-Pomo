interface SliderInputProps {
  label: string;
  min: number;
  max: number;
  value: number;
  step?: number;
  displayValue?: string | number;
  onChange: (newValue: number) => void;
}

function SliderInput({
  label,
  min,
  max,
  value,
  step = 1,
  displayValue,
  onChange,
}: SliderInputProps) {
  return (
    <div className="slider-input">
      <div className="slider-label-row">
        <span className="slider-label">{label} </span>
        <span className="slider-value">{displayValue ?? value} </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export default SliderInput;
