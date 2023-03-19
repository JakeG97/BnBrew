import { useState } from "react";
import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { createReview } from "../../store/reviews";
import "./CreateReviewForm.css"


const CreateReviewForm = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [stars, setStars] = useState(0);
    const [review, setReview] = useState("");
    const [error, setError] = useState(null); // add state for error message

    const submitHandler = async (e) => {
        e.preventDefault();
        const payload = {
            review,
            stars
        }
        let addedReview = await dispatch(createReview(payload, spotId))

        if (addedReview) {
            history.push(`/spots/${spotId}`)
        } else {
            // handle error
            setError('There was an error creating your review. Please try again.'); // set error state
        }
    };

    return (
        <div id="review-main-div">
            <div id ="review-styling" className="review-container">
                <h1 id="review-header">How was your stay?</h1>
                {error && <h2>{error}</h2>} {/* render error message */}
                <form onSubmit={submitHandler}>
                    <div>
                        <div id="review-title">Leave your review here...</div>
                        <label htmlFor="review"></label>
                        <textarea
                            className="review-textarea"
                            type="text"
                            onChange={e => setReview(e.target.value)}
                            value={review} />
                    </div>
                    <div className="star-container">
                    <div id='star-heading'>Rate your stay</div>
                        <fieldset id='fieldset-stars'class="rate" value={stars} onChange={e => setStars(e.target.value)}>
                            <input className="star-input" type="radio" id="rating10" name="rating" value="5" /><label for="rating10" title="5 stars"></label>
                            <input className="star-input" type="radio" id="rating8" name="rating" value="4" /><label for="rating8" title="4 stars"></label>
                            <input className="star-input" type="radio" id="rating6" name="rating" value="3" /><label for="rating6" title="3 stars"></label>
                            <input className="star-input" type="radio" id="rating4" name="rating" value="2" /><label for="rating4" title="2 stars"></label>
                            <input className="star-input" type="radio" id="rating2" name="rating" value="1" /><label for="rating2" title="1 star"></label>
                        </fieldset>
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