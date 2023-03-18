import { useState } from "react";
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
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

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

  if (!reviews) {
    return null;
  }

  return (
    <div>
      <h2 className="review-div">Reviews</h2>
      {Object.values(reviews).map((review) => (
        <div className="star-block" key={review.id}>
          <div className="name">Review by: {review.User?.firstName}</div>
          <div className="name">{review.review}</div>
          <div id="star" className="fas fa-sold fa-star">
            {review.stars}
          </div>
          <div>
            {review.userId === user?.id && (
              <button id='delete-review-button' onClick={() => deleteHandler(review.id)}>Delete review</button>
            )}
          </div>
        </div>
      ))}
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
