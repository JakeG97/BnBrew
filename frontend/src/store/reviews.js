import { csrfFetch } from "./csrf"

const READ = "reviews/READ"
const CREATE = "reviews/CREATE"
const DELETE = "reviews/DELETE"

const read = (reviews) => ({
    type: READ,
    reviews
});

const create = (review, spotId) => ({
    type: CREATE,
    review,
    spotId
});

const remove = (reviewId) => ({
    type: DELETE,
    payload: reviewId
});


// read all reviews
export const getAllReviews = (spotId) => async (dispatch) => {

    const res = await fetch(`/api/spots/${spotId}/reviews`)

    if(res.ok){
        const reviews = await res.json();
        dispatch(read(reviews.Reviews))
    }
}

// add a review
export const createReview = (review, spotId) => async (dispatch) => {

    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    });

    if (res.ok) {
        const addedReview = await res.json();
        dispatch(create(addedReview));
        return addedReview;
    }
};

//delete a review
export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(remove(reviewId));
        return null;
    }
}

const initialState = {
    spot:{},
    user:{}
};

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){

        case READ:
            const reviewList = {};
            action.reviews.forEach((review) => {
                reviewList[review.id] = review
            })
            return reviewList

            case CREATE:
                newState = {
                    ...state,
                spot: {
                    ...state.spot,
                    [action.review.id]: action.review,
                    },
                };
                return newState;

        case DELETE:
            newState = { ...state,
                spot: { ...state.spot }
            };
            delete newState.spot[action.reviewId];
            return newState;

        default:
            return state;
    }
}

export default reviewReducer