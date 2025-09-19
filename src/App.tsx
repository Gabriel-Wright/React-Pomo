import Header from "./components/Header";
import MainContainer from "./components/MainContainer";

function App() {
  // Initialise useState variables we may want here.

  // Then in here - pass useState variables to MainContainer
  // Depending on whether isSetup - show different pages
  // Depending on theme selected - use different CSS reactively

  //MainController can have 2 different components
  //Setup View
  // Rounds
  // Work Time
  // Break Time
  // Done

  //Timer View
  //COG in top right of view to go back to SetupView
  //Start
  //Pause

  return (
    <div>
      <Header />

      <MainContainer isSetup={false} />
    </div>
  );
}

export default App;
