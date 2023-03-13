import { Link } from "react-router-dom";
import './SpotBlocks.css'

export default function SpotBlocks({spot}){
    return (
        <>
            {spot && (
                <div>
                    <div className="SpotImages" key={spot?.id}>
                        <Link className="link" to={`/spots/${spot?.id}`}>
                            <div>
                                <img className="SpotImages" src={spot.previewImage} alt="brewery"/>
                            </div>
                            <div className="spotDetailsContainer">
                                <div className="spotContent">
                                    {spot?.city}, {spot?.state}
                                </div>
                                <i id="rating" className="fa-sharp fa-solid fa-star">{spot?.avgRating}</i>
                            </div>
                            <div className="spotDetails">
                                <div className="text">{spot?.name}</div>
                                <div className="text">{spot?.description}</div>
                                <div className="priceContainer">
                                    <span className="price">{spot?.price}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}