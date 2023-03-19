import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteReview } from "../../store/reviews";
import { getSpotDetails } from "../../store/spots";
import "./ReviewForm.css";

export default function Reviews() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const reviews = useSelector(state => state.reviews);
  const user = useSelector(state => state.session.user);
  const spot = useSelector(state => state.spots[spotId])
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [showReviews, setShowReviews] = useState(false);

  const deleteHandler = async (reviewId) => {
    setReviewToDelete(reviewId);
    setConfirmDelete(true);
  };

  const confirmDeleteHandler = async () => {
    const updatedReviews = Object.values(reviews).filter(
      (review) => review.id !== reviewToDelete
    );
    await dispatch(deleteReview(reviewToDelete));
    dispatch(getSpotDetails(spotId, updatedReviews));
    setConfirmDelete(false);
    setReviewToDelete(null);
    history.push(`/spots/${spotId}`);
  };

  const orderReviews = () => {
    const reviewsArray = Object.values(reviews);
    reviewsArray.sort((a, b) => {
      const createdReview1 = Date.parse(a?.createdAt);
      const createdReview2 = Date.parse(b?.createdAt);
      if (isNaN(createdReview1) || isNaN(createdReview2)) {
        return a.id - b.id;
      } else if (createdReview1 < createdReview2) {
        return 1;
      } else if (createdReview1 > createdReview2) {
        return -1;
      } else {
        return 0;
      }
    });
    return reviewsArray;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowReviews(true);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (!reviews) {
    return null;
  }

  return (
    <div className="review-main-div">
      <h3 id="title" className="fas fa-sold fa-star">{orderReviews().length > 0 ? Number.parseFloat(spot?.avgRating).toFixed(1) : ""}</h3>
      {orderReviews().length > 0 && " • "}
      {orderReviews().length > 0 && <span><span className="dot-separator"></span><span id="review-count">{orderReviews().length} {orderReviews().length === 1 ? 'review' : 'reviews'}</span></span>}
      {orderReviews().length === 0 && <div id="new"> New</div>}
      {orderReviews().length < 1 && <div id="no-review-text">Be the first to post a review!</div>}
      {orderReviews().map((review) => {
      const reviewDate = new Date(review?.createdAt);
      const monthYear = reviewDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  
        return (
          <div className="star-block" key={review.id}>
            <div className="reviewer-name">{review.User?.firstName}</div>
            <div className="month-year">{monthYear}</div>
            <div className="actual-review">{review.review}</div>
              <div id="star" className="fas fa-sold fa-star">
                {review.stars}
              </div>
              <div>
                {review.userId === user?.id && (
                <button id='delete-review-button' onClick={() => deleteHandler(review.id)}>Delete review</button>
                )}
              </div>
          </div>
          );
      })}
      {confirmDelete && (
        <div className="confirm-delete">
          <div className="confirm-delete-content">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <div className="confirm-delete-buttons">
              <button className="confirm-delete-yes" onClick={confirmDeleteHandler}>
                Yes (Delete Review)
              </button>
              <button
                className="confirm-delete-no"
                onClick={() => setConfirmDelete(false)}
              >
                No (Keep Review)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );       
}
