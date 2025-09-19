import Alert from "./components/Alert";
import ListGroup from "./components/ListGroup";
import Button from "./components/Button";
function App() {
  return (
    <Button
      buttonName="test-button"
      buttonAlert="button-alert"
      buttonFunction={(alert: string) => console.log("clicked " + alert)}
    ></Button>
  );
}

export default App;
