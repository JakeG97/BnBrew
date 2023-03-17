import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotComponent from "./components/AllSpots";
import SignupFormModal from "./components/SignupFormModal";
import SpotDetails from "./components/SpotDetails"
import CreateSpotForm from "./components/CreateSpotForm";
import EditSpotForm from "./components/EditSpot";
import OwnerSpots from "./components/OwnerSpots";
import CreateReviewForm from "./components/CreateReviewForm";

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
          <Route path="/newspot">
            <CreateSpotForm />
          </Route>
          <Route path={`/spots/:spotId/new-review`}>
            <CreateReviewForm />
          </Route>
          <Route exact path="/spots/current">
            <OwnerSpots />
          </Route>
          <Route exact path={"/spots/:spotId"}>
            <SpotDetails />
          </Route>
          <Route path="/spots/:spotId/edit">
            <EditSpotForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
