<<<<<<< HEAD
const READ = "api/spots"



const read = (allSpots) => {
    return {
        type: READ,
        payload: allSpots,
    };
};

=======
const READ_SPOTS = "spots/READ_SPOTS"



const read = (spots) => ({
    type: READ_SPOTS,
    spots
});
>>>>>>> read-spots


// read all spots
export const getAllSpots = () => async (dispatch) => {
    const res = await fetch(`/api/spots`);

    if (res.ok) {
<<<<<<< HEAD
        const allSpots = await res.json();
        dispatch(read(allSpots));
=======
        const spots = await res.json();
        dispatch(read(spots));
>>>>>>> read-spots
    }
};



<<<<<<< HEAD
const initialState = { allSpots: [] };
=======
const initialState = {
    allSpots: {},
};
>>>>>>> read-spots

const spotReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
<<<<<<< HEAD
        case READ: {
            const newState = { ...state };
            newState.allSpots = action.payload;
            return newState;
        }
=======
        case READ_SPOTS:
            newState = {...state};
            const allSpots = {};
            action.spots.Spots.forEach((spot) => {
                allSpots[spot.id] = spot;
            });
            newState.allSpots = allSpots
            return allSpots;
>>>>>>> read-spots
        default:
            return state;
    }
};

export default spotReducer;