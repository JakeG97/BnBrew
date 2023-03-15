import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import { getSpotDetails } from "../../store/spots";
import "./SpotDetails.css"
import Reviews from "../ReviewForm";
import { getAllReviews } from "../../store/reviews";
import { removeSpot } from "../../store/spots";


const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const spot = useSelector((state) => state.spots[spotId]);
    const review = useSelector((state) => state.reviews);
    const user = useSelector((state) => state.session?.user)

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(removeSpot(spotId));
        history.push("/")
    };

    useEffect(() => {
        dispatch(getSpotDetails(spotId));
        dispatch(getAllReviews(spotId))
    }, [dispatch, spotId]);

    const userOwner = (user && user.id === spot?.ownerId);

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
                {userOwner && (
                    <div key={spot} className="delete-button-container">
                        <button className="delete-button" onClick={(e) => handleDelete(e)}>Delete Your Spot</button>
                    </div>
                )}
                </div>
                <div className="reviewArea">
                    <Reviews key={review} review={review} />
                </div>
            </div>
        </div>
    );
}

export default SpotDetails;