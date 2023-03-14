import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getSpotDetails } from "../../store/spots";
import "./SpotDetails.css"



const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const spot = useSelector((state) => state.spots[spotId]);

    useEffect(() => {
        dispatch(getSpotDetails(spotId));
    }, [dispatch, spotId]);

    return (
        <div key={spot} className="DivHead">
            <div>
                <h1 className="spot-name">{spot?.name}</h1>
                <h4 id="city-state" className="fas fa-solid fa-star">
                {" "}
                {spot?.avgRating}{" "}
                {spot?.city},{" "}{spot?.state}
                </h4>
                <div>
                {spot && spot.SpotImages && spot.SpotImages.map((image) => {
                        return (
                            <div key={image.id}>
                                <img  className="spotImage" src={spot.previewImg} alt="brewery" />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="information-container">
                <div className="text">
                    {/* <div className="hostName">Hosted By: {spot.Owner.firstName}</div> */}
                    <div className="spot-description"> Description: {spot?.description}</div>
                </div>
                <div className="review-block">
                    <div className="price-container">
                        <div>
                            <span className="actual-price">${spot?.price}</span>
                        </div>
                        <div className="fa-sharp fa-solid fa-star">
                            {" "}: {spot?.avgRating}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpotDetails;