import { useState } from "react";
import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { createReview } from "../../store/reviews";
import "./CreateReviewForm.css"

const CreateReviewForm = ({handleClose}) => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [stars, setStars] = useState(0);
    const [review, setReview] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [reviewValid, setReviewValid] = useState(true);
    const [starsValid, setStarsValid] = useState(true);
    const [error, setError] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();

        setFormSubmitted(true);

        const reviewValid = review.length >= 10;
        const starsValid = stars > 0;

        setReviewValid(reviewValid);
        setStarsValid(starsValid);

        if (reviewValid && starsValid) {
            const payload = {
                review,
                stars
            }
            let addedReview = await dispatch(createReview(payload, spotId))

            if (addedReview) {
                handleClose();
                history.push(`/spots/${spotId}`)
            } else {
                setError('There was an error creating your review. Please try again.');
            }
        }
    };

    return (
        <div id="review-main-div">
            <div id ="review-styling" className="review-container">
                <h1 id="review-header">How was your stay?</h1>
                {error && <h2>{error}</h2>}
                <form onSubmit={submitHandler}>
                <div className="review-type-area">
  <label htmlFor="review"></label>
  <textarea
    className="review-textarea"
    type="text"
    onChange={e => setReview(e.target.value)}
    value={review}
    placeholder="Leave your review here..." />
  {!reviewValid && formSubmitted && (
    <p className="error-message">Review must be at least 10 characters long</p>
  )}
</div>
<div className="star-container">
  <div id='star-heading'>Rate your stay</div>
  <fieldset id='fieldset-stars' class="rate" value={stars} onChange={e => setStars(e.target.value)}>
    <input className="star-fill" type="radio" id="five" name="rating" value="5" /><label for="five" title="5 stars"></label>
    <input className="star-fill" type="radio" id="four" name="rating" value="4" /><label for="four" title="4 stars"></label>
    <input className="star-fill" type="radio" id="three" name="rating" value="3" /><label for="three" title="3 stars"></label>
    <input className="star-fill" type="radio" id="two" name="rating" value="2" /><label for="two" title="2 stars"></label>
    <input className="star-fill" type="radio" id="one" name="rating" value="1" /><label for="one" title="1 star"></label>
  </fieldset>
  {!starsValid && formSubmitted && (
    <p className="error-message">Please select a star rating</p>
  )}
</div>
                    <div id='createReview-buttonDiv'>
                        <button id='createReview-submitBtn' disabled={review.length < 10} type='submit'>Submit your review</button> {/* disable submit button if review text is less than 10 characters */}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateReviewForm;