import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnerSpot } from "../../store/spots";
import SpotBlocks from "../SpotBlocks";
import "../AllSpots/allSpots.css";
import "./OwnerSpots.css"
import { NavLink, useHistory } from "react-router-dom";
import { removeSpot } from "../../store/spots";

const OwnerSpots = () => {
  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    dispatch(getOwnerSpot());
  }, [dispatch]);

  const spots = useSelector((state) => Object.values(state.spots));

  if(spots.length === 0) {
    return (
        <div className="main-div">
            <div className="blocks">
                <button className="create-button" onClick={() => history.push('/newspot')}>
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
          onClick={(e) => handleDelete(e, spot.id)}
        >Delete</button>
      </div>
    </div>
  ));

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await dispatch(removeSpot(id));
    history.push("/");
  };

  return (
    <div className="main-div">
      <h1 className="title">My Spots</h1>
      <div className="blocks">{spotlist}</div>
    </div>
  );
};

export default OwnerSpots;