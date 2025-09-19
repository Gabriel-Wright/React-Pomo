interface Props {
  buttonName: string;
  buttonAlert: string;
  buttonFunction: (alert: string) => void;
}

const Button = (props: Props) => {
  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => props.buttonFunction(props.buttonAlert)}
    >
      {props.buttonName}
    </button>
  );
};

export default Button;
