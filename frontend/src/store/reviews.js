import { csrfFetch } from "./csrf"

const READ = "reviews/READ"
const CREATE = "reviews/CREATE"


const read = (reviews) => ({
    type: READ,
    reviews
});

const create = (review, spotId) => ({
    type: CREATE,
    review,
    spotId
});


export const getAllReviews = (spotId) => async (dispatch) => {

    const res = await fetch(`/api/spots/${spotId}/reviews`)

    if(res.ok){
        const reviews = await res.json();
        dispatch(read(reviews.Reviews))
    }
}


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
                    [action.review.id]: action.review
                }
            };
            return {
                ...state, 
                newState
            }

        default:
            return state;
    }
}

export default reviewReducer