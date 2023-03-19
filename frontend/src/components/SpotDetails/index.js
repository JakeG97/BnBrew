import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSpotDetails, removeSpot } from "../../store/spots";
import { NavLink } from "react-router-dom";
import "./SpotDetails.css";
import Reviews from "../ReviewForm";
import { getAllReviews, deleteReview } from "../../store/reviews";

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const spot = useSelector((state) => state.spots[spotId]);
    const user = useSelector((state) => state.session?.user);
    const reviews = useSelector((state) => state.reviews);

    const [reviewsLoaded, setReviewsLoaded] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();
        setConfirmDelete(true);
    };

    const confirmDeleteHandler = async () => {
        await dispatch(removeSpot(spotId));
        history.push("/");
    };

    useEffect(() => {
        dispatch(getSpotDetails(spotId));
        dispatch(getAllReviews(spotId)).then(() => setReviewsLoaded(true));
    }, [dispatch, spotId]);

    const userOwner = user && user.id === spot?.ownerId;
  
    const reviewsArray = Object.values(reviews);

    let userHasReviewed = reviewsArray.find(
        (review) => review.spotId === spotId && review.userId === user?.id
    );

    const reviewCount = reviewsArray.length;

    const handleReviewClick = () => {
        if (!userHasReviewed) {
            history.push(`/spots/${spotId}/new-review`);
        } else {
            alert("you've already left a review on this spot")
        }
    };

    const handleReviewDelete = async (reviewId) => {
        await dispatch(deleteReview(reviewId));
        userHasReviewed = undefined;
    };

  
  return (
    <div key={spot} className="div-head">
        {spot && (
        <div>
            <h1 className="spot-name">{spot?.name}</h1>
            <h4 className="city-state">
                {" "}
                {spot?.city}, {spot?.state}, {spot?.country}
            </h4>
            <div className="image-container" key={spot?.id}>
            <div className="big-image-container">
            {spot && spot.SpotImages?.length > 0 && (
                        <img id = "big-image" className="spot-image-0" src={spot.SpotImages[0].url} alt="brewery" />
                    )}
                </div>
                <div className="small-image-container">
                    {spot.SpotImages && spot.SpotImages.length > 1 && (
                        spot.SpotImages.slice(1).map((image, index) => {
                            return (
                                <div key={image.id}>
                                    <img
                                        className={`spot-image-${index + 1}`}
                                        src={image.url}
                                        alt="brewery"
                                    />
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
        )}
        <div className="information-container">
            <div className="title-description-container">
            <h4 className="owner-name">Hosted by {spot?.Owner?.firstName}</h4>
                <div className="spot-description">
                    {" "}
                    Description: {spot?.description}
                </div>
            </div>
            <div className="review-block-container">
                <div className="review-block">
                    <div className="price-container">
                        <div>
                            <span className="actual-price">${spot?.price} night</span>
                        </div>
                        <div className="fa-sharp fa-solid fa-star">
                            {spot?.avgRating !== undefined && spot?.avgRating !== null && (
                                <>
                                    {Number.parseFloat(spot?.avgRating).toFixed(1)}{" "}
                                    {reviewCount > 0 && (
                                    <>
                                    • {reviewCount} review{reviewCount === 1 ? '' : 's'}
                                    </>
                            )}
                                    {reviewsArray.length === 0 && <div id="new"> New</div>}
                                </>
                            )}
                            {spot?.avgRating === undefined && spot?.avgRating === null && (
                                <>{" "}</>
                            )}
                        </div>
                        <button className="reserve-button" onclick="alert('Feature Coming Soon...')">Reserve</button>
                    </div>
                </div>
            </div>
                {!user ? (
                    <div className="create-review-message">
                    </div>
                ) : (
                    userHasReviewed ? (
                        <div className="create-review-message">
                            You've already left a review on this spot!
                        </div>
                    ) : (
                        <button
                            className="create-review-button"
                            onClick={handleReviewClick}
                            disabled={userHasReviewed !== undefined}
                        > Post Your Review </button>
                    )
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
            <div className="review-area">
                {userHasReviewed ? (
                    <Reviews
                        reviews={reviewsArray.filter((review) => review.userId === user?.id)}
                        handleReviewDelete={handleReviewDelete}
                    />
                ) : (
                    <Reviews reviews={reviewsArray} />
                )}
            </div>
        {confirmDelete && (
            <div className="confirm-delete">
                <div className="confirm-delete-content">
                    <h2>Confirm Delete</h2>
                    <p>Are you sure you want to remove this spot?</p>
                    <div className="confirm-delete-buttons">
                        <button className="confirm-delete-yes" onClick={confirmDeleteHandler}>
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
}
export default SpotDetails;