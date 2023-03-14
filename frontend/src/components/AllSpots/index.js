import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import SpotBlocks from "../SpotBlocks";
import "./allSpots.css"

const SpotComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch])

    const spots = useSelector((state) => Object.values(state.spots));

    if (!spots) return null;

    const spotsList = spots.map((spot) => (
        <div key={spot.id}>
            <SpotBlocks key={spot.id} spot={spot} />
        </div>
    ));

    return (
        <div>
            {spotsList}
        </div>
    );
}

export default SpotComponent;