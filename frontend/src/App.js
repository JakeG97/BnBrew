import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
<<<<<<< HEAD
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotComponent from "./components/AllSpots";
// import SignupFormModal from "./components/SignupFormModal";

=======
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotComponent from "./components/AllSpots";
import SignupFormModal from "./components/SignupFormModal";
>>>>>>> read-spots

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
<<<<<<< HEAD
        {isLoaded && (
          <Switch>
            <Route path={[ "/", "/api/spots"]} exact>
              <SpotComponent />
            </Route>
          </Switch>
        )} 
=======
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormModal />
          </Route>
          <Route path="/">
            <SpotComponent />
          </Route>
        </Switch>
      )}
>>>>>>> read-spots
    </>
  );
}

export default App;