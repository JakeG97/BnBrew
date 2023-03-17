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

  const deleteHandler = async (reviewId) => {
    const updatedReviews = Object.values(reviews).filter(
      (review) => review.id !== reviewId
    );
    await dispatch(deleteReview(reviewId));
    dispatch(getSpotDetails(spotId, updatedReviews));
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
    </div>
  );
}