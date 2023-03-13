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

    const spots = useSelector(state => state.spots.allSpots);

    const spotsList = Object.values(spots)

    console.log('spots:', spotsList)

    return (
        <>
            <nav className="blocks-section">
                    {spotsList.map(spot => {
                        if (!spot) return null;
                        return (
                            <SpotBlocks spot={spot} />
                        )})
                    }
            </nav>
        </>
    );
}

export default SpotComponent;