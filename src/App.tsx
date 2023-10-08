import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import MWrapper from "./containers/MWrapper";
import ThemeContainer from "./components/ThemeContainer";

function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeContainer>
          <Router>
            <MWrapper />
          </Router>
        </ThemeContainer>
      </Provider>
    </>
  );
}

export default App;
