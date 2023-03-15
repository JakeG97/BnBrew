const READ_SPOTS = "spots/READ_SPOTS"
const READ_ONE = "spots/READ_ONE"



const read = (spots) => ({
    type: READ_SPOTS,
    spots
});

const readOne = (spot) => ({
    type: READ_ONE,
    spot
})


// read all spots
export const getAllSpots = () => async (dispatch) => {
    
    const res = await fetch(`/api/spots`);

    if (res.ok) {
        const spots = await res.json();
        dispatch(read(spots));
    }
};

// read one spot
export const getSpotDetails = (spotId) => async dispatch => {

    const res = await fetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const spotDetails = await res.json();
        dispatch(readOne(spotDetails))
    }
}



const initialState = {};

const spotReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {

        case READ_SPOTS:
            newState = {...state};
            const allSpots = {};
            action.spots.Spots.forEach((spot) => {
                allSpots[spot.id] = spot;
            });

            newState.allSpots = allSpots
            return allSpots;
            
        case READ_ONE: {
            const oneSpot = { ...state };
            oneSpot[action.spot.id] = action.spot;
            return oneSpot
            };
        default:
            return state;
    };
};

export default spotReducer;