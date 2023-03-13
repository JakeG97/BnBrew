const READ = "spots/READ"



const read = (spots) => {
    return {
        type: 'READ',
        spots
    };
};



// read all spots
export const getAllSpots = () => async (dispatch) => {
    
    const res = await fetch(`api/spots`);

    if (res.ok) {
        const spots = await res.json();
        dispatch(read(spots.Spots));
    }
};



const initialState = {};

const spotReducer = (state = initialState, action) => {
    switch(action.type) {
        case READ:
            const allSpots = {};
            action.spots.forEach((spot) => {
                allSpots[spot.id] = spot;
            });
            return allSpots;
        default:
            return state;
    };
};

export default spotReducer;