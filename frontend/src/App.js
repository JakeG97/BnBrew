import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotComponent from "./components/AllSpots";
import SignupFormModal from "./components/SignupFormModal";
import SpotDetails from "./components/SpotDetails"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormModal />
          </Route>
          <Route exact path="/">
            <SpotComponent />
          </Route>
          <Route exact path={"/spots/:spotId"}>
            <SpotDetails />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
