import { Link } from "react-router-dom";
import './SpotBlocks.css'

export default function SpotBlocks({spot}){
    return (
        <>
            {spot && (
                <div className="blocks-container">
                    <div className="SpotImages" key={spot?.id}>
                        <Link className="link" to={`/spots/${spot?.id}`}>
                            <div>
                                <img className="SpotImages" src={spot?.previewImg} alt="brewery"/>
                            </div>
                            <div className="spot-details-container">
                                <div className="spot-content">
                                    {spot?.city}, {spot?.state}
                                </div>
                                    <div className="ratings-container">
                                        <i id="rating" className="fa-sharp fa-solid fa-star">{spot?.avgRating}</i>
                                    </div>
                            </div>
                            <div className="spot-details">
                                <div className="text">{spot?.name}</div>
                                <div className="price-container">
                                    <span className="price">${spot?.price}{" "}night</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}