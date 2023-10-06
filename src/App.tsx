import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";
import MPokeList from "./containers/MPokeList";
import MPokeDescription from "./containers/MPokeDescription";
import MWrapper from "./containers/MWrapper";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <MWrapper />
        </Router>
      </Provider>
    </>
  );
}

export default App;
