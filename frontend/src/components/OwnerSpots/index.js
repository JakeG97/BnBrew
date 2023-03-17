import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnerSpot } from "../../store/spots";
import SpotBlocks from "../SpotBlocks";
import "../AllSpots/allSpots.css"

const OwnerSpots = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOwnerSpot());
    }, [dispatch]);

    const spots = useSelector((state) => Object.values(state.spots));

    if(!spots) return null;

    const spotlist = spots.map((spot) => <SpotBlocks key={spot.id} spot={spot} />);

    return (
        <div className="main-div">
            <div className="blocks">
                {spotlist}
            </div>
        </div>
    );
}

export default OwnerSpots;