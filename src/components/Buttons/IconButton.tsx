export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode; //extends HTML button so will accept defaults
  tooltip?: string;
}

function IconButton({ children, tooltip, ...props }: IconButtonProps) {
  return (
    <button {...props} className={"container-buttons"} title={tooltip}>
      {children}
    </button>
  );
}

export default IconButton;
