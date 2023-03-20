import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnerReviews, deleteReview } from "../../store/reviews";
import "./OwnerReviews.css"


export default function GetReviews() {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews);

    useEffect(() => {
        dispatch(getOwnerReviews());
    }, [dispatch]);

    if(!reviews) return null;

    return (
        <div>
            <div className="main-div">
                <h1 className="title">Your Reviews</h1>
                <div className="review-blocks">
                    {Object.values(reviews).map((review) => (
                        <div key={review.id}>
                            <div className="review-page">
                                Review by: {review.User?.firstName}
                            </div>
                            <div className="actual-review">{review.review}</div>
                            <div id="stars" className="fas fa-solid fa-star">{review.stars}</div>
                            <div>
                                <button className="owner-delete-button" onClick={(e) => dispatch(deleteReview(review.id))}>Delete Your Review</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}