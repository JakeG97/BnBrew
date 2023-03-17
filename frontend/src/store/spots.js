import { csrfFetch } from "./csrf";

const READ_SPOTS = "spots/READ_SPOTS";
const READ_ONE = "spots/READ_ONE";
const CREATE = "spots/CREATE";
const DELETE = "spots/DELETE";
const UPDATE = "spots/UPDATE";
// const LOAD_CURRENT = "spots/LOAD_CURRENT"



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

const deleteSpot = (spotlist) => ({
    type: DELETE,
    spotlist
});

const updateSpot = (spotlist) => ({
    type: UPDATE,
    spotlist
})

// const current = (spotlist) => ({
//     type: LOAD_CURRENT,
//     spotlist
// })

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
        const data = await res.json();
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

// delete a spot
export const removeSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        dispatch(deleteSpot(spotId));
        return null;
    }
};

// edit a spot
export const editSpot = (payload) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${payload.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (res.ok) {
        const updatedSpot = await res.json();
        dispatch(updateSpot(updatedSpot));
        return updatedSpot;
    }
};

// read an Owner's spot
export const getOwnerSpot = () => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/current`);

    if (res.ok) {
        const spots = await res.json();
        dispatch(read(spots));
        return spots;
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
            const newState = { ...state };
            newState[action.spot.id] = action.spot;
            return newState
            };

        case CREATE:
            newState = { ...state };
            newState[action.spotlist.id] = action.spotlist;
            return newState;

        case DELETE:
            const deleteState = { ...state };
            delete removeSpot[action.spotlist];
            return deleteState;

        case UPDATE:
            if(!state[action.spotlist.id]) {
                const newState = { ...state, [action.spotlist.id]: action.spotlist };
                const spotList = newState.spotlist.map((id) => newState[id]);
                spotList.push(action.spotlist);
                newState.spotlist = spotList;
                return newState
            } return {
                ...state,
                [action.spotlist.id]: {
                    ...state[action.spotlist.id],
                    ...action.spotlist,
                },
            };

        default:
            return state;
    };
};

export default spotReducer;