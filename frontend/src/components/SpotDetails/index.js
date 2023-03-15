import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getSpotDetails } from "../../store/spots";
import "./SpotDetails.css"
import Reviews from "../ReviewForm";
import { getAllReviews } from "../../store/reviews";



const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const spot = useSelector((state) => state.spots[spotId]);
    const review = useSelector((state) => state.reviews);

    useEffect(() => {
        dispatch(getSpotDetails(spotId));
        dispatch(getAllReviews(spotId))
    }, [dispatch, spotId]);

    return (
        <div key={spot} className="div-head">
            <div>
                <h1 className="spot-name">{spot?.name}</h1>
                <h4 className="city-state">
                    {" "}{spot?.city},{" "}{spot?.state}
                </h4>
                <div className="image-container" key={spot?.id}>
                    {spot.SpotImages && spot.SpotImages.map((image, index) => {
                        return (
                            <div key={image.id}>
                                <img className={`spot-image-${index}`} src={image.url} alt="brewery" />
                            </div>
                        );
                    })}
                </div>
                <h4 className="owner-name">
                    Hosted by {spot?.Owner?.firstName}
                </h4>
            </div>
            <div className="information-container">
                <div className="text">
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
                <div className="reviewArea">
                    <Reviews key={review} review={review} />
                </div>
            </div>
        </div>
    );
}

export default SpotDetails;