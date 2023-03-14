const READ_SPOTS = "spots/READ_SPOTS"



const read = (spots) => ({
    type: READ_SPOTS,
    spots
});


// read all spots
export const getAllSpots = () => async (dispatch) => {
    
    const res = await fetch(`api/spots`);

    if (res.ok) {
        const spots = await res.json();
        dispatch(read(spots));
    }
};



const initialState = {
    allSpots: {},
};

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
        default:
            return state;
    };
};

export default spotReducer;