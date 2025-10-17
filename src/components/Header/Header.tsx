import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <div className="header">
      <h1 className="title">POMODORO</h1>
      <a className="dropdown-btn" onClick={() => setOpen(!open)}></a>
    </div>
  );
}

export default Header;
