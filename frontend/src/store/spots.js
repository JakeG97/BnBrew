import { csrfFetch } from "./csrf";

const READ_SPOTS = "spots/READ_SPOTS";
const READ_ONE = "spots/READ_ONE";
const CREATE = "spots/CREATE";
const DELETE = "spots/DELETE";
const UPDATE = "spots/UPDATE";
const UPDATE_REVIEWS = "spots/UPDATE_REVIEWS";
const ADD_IMAGES = "spots/ADD_IMAGES";




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

const updateReviews = (spotId, reviews) => ({
    type: UPDATE_REVIEWS,
    spotId,
    reviews,
});

const updateSpotImages = (spotId, image) => ({
    type: ADD_IMAGES,
    spotId,
    image,
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
export const getSpotDetails = (spotId, reviews) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const spotDetails = await res.json();
        dispatch(readOne(spotDetails));
        if (reviews) {
            dispatch(updateReviews(spotId, reviews));
        }
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
      images,
    } = payload;
  
    const res = await csrfFetch(`/api/spots`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      const spotData = await res.json();
  
      if (images && images.length > 0) {
        const imageData = await Promise.all(
          images.map((image) =>
            dispatch(addSpotImages(spotData.id, image.url, image.preview))
          )
        );
        spotData.SpotImages = imageData;
      }
  
      dispatch(createSpot(spotData));
      return spotData;
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

export const addSpotImages = (spotId, url, preview) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        url,
        preview,
      }),
    });
 if (res.ok) {
    const imgData = await res.json();
    dispatch(updateSpotImages(spotId, imgData));
    return imgData;
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

        case UPDATE_REVIEWS:
            newState = { ...state };
            newState[action.spotId].Reviews = action.reviews;
            return newState;

        case ADD_IMAGES:
            newState = { ...state };
            newState[action.spotId].SpotImages = action.images;
            return newState;

        default:
            return state;
    };
};

export default spotReducer;