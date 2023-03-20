import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnerSpot, removeSpot } from "../../store/spots";
import SpotBlocks from "../SpotBlocks";
import "../AllSpots/allSpots.css";
import "./OwnerSpots.css";
import { NavLink, useHistory } from "react-router-dom";

const OwnerSpots = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [currentSpotId, setCurrentSpotId] = useState(null);

  useEffect(() => {
    dispatch(getOwnerSpot());
  }, [dispatch]);

  const spots = useSelector((state) => Object.values(state.spots));

  if (spots.length === 0) {
    return (
      <div className="main-div">
        <div className="blocks">
          <button
            className="create-button"
            onClick={() => history.push("/newspot")}
          >
            Create a New Spot
          </button>
        </div>
      </div>
    );
  }

  const spotlist = spots.map((spot) => (
    <div key={spot.id}>
      <SpotBlocks spot={spot} />
      <div className="button-container">
        <NavLink to={`/spots/${spot.id}/edit`}>
          <button className="edit-button">Update</button>
        </NavLink>
        <button
          className="delete-button"
          onClick={() => handleDeleteConfirmation(spot.id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));

  const handleDeleteConfirmation = (spotId) => {
    setCurrentSpotId(spotId);
    setConfirmDelete(true);
  };

  const confirmDeleteHandler = async () => {
    await dispatch(removeSpot(currentSpotId));
    setCurrentSpotId(null);
    setConfirmDelete(false);
    history.push("/");
  };

  return (
    <div className="owner-spots-div">
      <h1 className="title">Manage Spots</h1>
      <div className="blocks">{spotlist}</div>
      {confirmDelete && (
        <div className="confirm-delete">
          <div className="confirm-delete-content">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot?</p>
            <div className="confirm-delete-buttons">
              <button
                className="confirm-delete-yes"
                onClick={confirmDeleteHandler}
              >
                Yes (Delete Spot)
              </button>
              <button
                className="confirm-delete-no"
                onClick={() => setConfirmDelete(false)}
              >
                No (keep spot)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerSpots;