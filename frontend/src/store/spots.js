import { csrfFetch } from "./csrf";

const READ_SPOTS = "spots/READ_SPOTS"
const READ_ONE = "spots/READ_ONE"
const CREATE = "spots/CREATE"



const read = (spots) => ({
    type: READ_SPOTS,
    spots
});

const readOne = (spot) => ({
    type: READ_ONE,
    spot
});

const createSpot = (spotlist) => ({
    type: CREATE,
    spotlist
});


// read all spots
export const getAllSpots = () => async (dispatch) => {
    
    const res = await csrfFetch(`/api/spots`);

    if (res.ok) {
        const spots = await res.json();
        dispatch(read(spots));
    }
};

// read one spot
export const getSpotDetails = (spotId) => async dispatch => {

    const res = await csrfFetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const spotDetails = await res.json();
        dispatch(readOne(spotDetails))
    }
}

// create a spot
export const addSpot = (payload) => async (dispatch) => {
    const {
        ownerId,
        address,
        city,
        country,
        description,
        name,
        price,
        state,
        url,
    } = payload;

    const res = await csrfFetch(`/api/spots`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            ownerId,
            address,
            city,
            country,
            description,
            name,
            price,
            state,
        }),
    });

    if (res.ok) {
        const data = await Response.json();
        const img = await csrfFetch(`/api/spots/${data.id}/images`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                url,
                preview: true,
            }),
        });
    if (img.ok) {
        const imgData = await img.json();
        data.SpotImages = [imgData];
        dispatch(createSpot(data));
        return data;
        }
    }
};



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

        case CREATE:
            newState = { ...state };
            newState[action.spotlist.id] = action.spotlist;
            return newState;

        default:
            return state;
    };
};

export default spotReducer;