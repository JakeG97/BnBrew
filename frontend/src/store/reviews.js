

const READ = "reviews/READ"

const read = reviews => ({
        type: READ,
        reviews
})


export const getAllReviews = (spotId) => async dispatch => {

    const res = await fetch(`/api/spots/${spotId}/reviews`)

    if(res.ok){
        const reviews = await res.json();
        dispatch(read(reviews.Reviews))
    }
}






const initialState = {};

const reviewReducer = (state = initialState, action) => {
    switch(action.type){

        case READ:

            const reviewList = {};

            action.reviews.forEach((review) => {
                reviewList[review.id] = review
            })

            return reviewList

        default:
            return state;
    }
}

export default reviewReducer