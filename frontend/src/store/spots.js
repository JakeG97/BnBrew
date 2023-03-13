const READ = "api/spots"



const read = (allSpots) => {
    return {
        type: READ,
        payload: allSpots,
    };
};



// read all spots
export const getAllSpots = () => async (dispatch) => {
    const res = await fetch(`/api/spots`);

    if (res.ok) {
        const allSpots = await res.json();
        dispatch(read(allSpots));
    }
};



const initialState = { allSpots: [] };

const spotReducer = (state = initialState, action) => {
    switch(action.type) {
        case READ: {
            const newState = { ...state };
            newState.allSpots = action.payload;
            return newState;
        }
        default:
            return state;
    }
};

export default spotReducer;