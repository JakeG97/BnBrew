import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSpotDetails, removeSpot } from "../../store/spots";
import { NavLink } from "react-router-dom";
import "./SpotDetails.css";
import Reviews from "../ReviewForm";
import { getAllReviews } from "../../store/reviews";


const SpotDetails = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const spot = useSelector((state) => state.spots[spotId]);
  const reviews = useSelector((state) => state.reviews);
  const user = useSelector((state) => state.session?.user);

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(removeSpot(spotId));
    history.push("/");
  };

  useEffect(() => {
    dispatch(getSpotDetails(spotId));
    dispatch(getAllReviews(spotId));
  }, [dispatch, spotId]);

  const userOwner = user && user.id === spot?.ownerId;

  const handleReviewClick = () => {
    if (userHasReviewed) {
      history.push(`/spots/${spotId}/reviews/${userHasReviewed.id}/edit`);
    } else {
      history.push(`/spots/${spotId}/new-review`);
    }
  };

  const reviewsArray = Object.values(reviews);
  const userHasReviewed = reviewsArray.find(
    (review) => review.spotId === spotId && review.userId === user?.id
  );
  
  return (
    <div key={spot} className="div-head">
      <div>
        <h1 className="spot-name">{spot?.name}</h1>
        <h4 className="city-state">
          {" "}
          {spot?.city}, {spot?.state}
        </h4>
        <div className="image-container" key={spot?.id}>
          {spot.SpotImages &&
            spot.SpotImages.map((image, index) => {
              return (
                <div key={image.id}>
                  <img
                    className={`spot-image-${index}`}
                    src={image.url}
                    alt="brewery"
                  />
                </div>
              );
            })}
        </div>
        <h4 className="owner-name">Hosted by {spot?.Owner?.firstName}</h4>
      </div>
      <div className="information-container">
        <div className="text">
          <div className="spot-description">
            {" "}
            Description: {spot?.description}
          </div>
        </div>
        <div className="review-block">
          <div className="price-container">
            <div>
              <span className="actual-price">${spot?.price}</span>
            </div>
            <div className="fa-sharp fa-solid fa-star">
              {" "}
              : {spot?.avgRating}
            </div>
          </div>
          {userHasReviewed ? (
            <div className="create-review-message">
              You've already left a review on this spot!
            </div>
          ) : (
            <button
              className="create-review-button"
              onClick={handleReviewClick}
              disabled={userHasReviewed}
            >
              Leave a Review
            </button>
          )}
          {userOwner && (
            <div key={spot} className="delete-button-container">
              <button
                className="delete-button"
                onClick={(e) => handleDelete(e)}
              >
                Delete Your Spot
              </button>
              <NavLink to={`/spots/${spot.id}/edit`}>
                <button className="edit-btn">Edit Your Spot</button>
              </NavLink>
            </div>
          )}
        </div>
        <div className="reviewArea">
          {userHasReviewed ? (
            <Reviews
              reviews={reviewsArray.filter(
                (review) => review.userId === user?.id
              )}
            />
          ) : (
            <Reviews reviews={reviewsArray} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotDetails;