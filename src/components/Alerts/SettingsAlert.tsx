import { useState } from "react";

interface SettingsAlertProps {
  message: string;
  onDismiss: () => void;
}

function SettingsAlert({ message, onDismiss }: SettingsAlertProps) {
  const [dontAskAgain, setDontAskAgain] = useState(false);

  const handleDismiss = () => {
    if (dontAskAgain) {
      localStorage.setItem("skipSettingsAlert", "true");
    }
    onDismiss();
  };
  return (
    <div className="alert-overlay">
      <div className="alert-content">
        <h2>Warning</h2>
        <p>{message}</p>
        <button className="alert-dismiss" onClick={handleDismiss}>
          Understood
        </button>
        <label>
          <input
            type="checkbox"
            checked={dontAskAgain}
            onChange={(e) => setDontAskAgain(e.target.checked)}
          />{" "}
          Don’t show this again
        </label>
      </div>
    </div>
  );
}

export default SettingsAlert;
