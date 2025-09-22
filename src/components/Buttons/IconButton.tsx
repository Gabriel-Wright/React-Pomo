interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; //extends HTML button so will accept defaults
}

function IconButton({ children, ...props }: IconButtonProps) {
  return (
    <button {...props} className={"container-buttons"}>
      {children}
    </button>
  );
}

export default IconButton;
