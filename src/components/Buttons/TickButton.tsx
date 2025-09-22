import IconButton from "./IconButton";

interface TickButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function TickButton({ ...props }: TickButtonProps) {
  return (
    <IconButton id="settings-button" {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
        />
      </svg>
    </IconButton>
  );
}

export default TickButton;
