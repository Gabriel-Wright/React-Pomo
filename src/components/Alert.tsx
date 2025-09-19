import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Alert = (props: Props) => {
  return (
    <div className="alert alert-primary" role="alert">
      {props.children}
    </div>
  );
};

export default Alert;
