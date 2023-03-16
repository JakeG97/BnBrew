import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { editSpot, getSpotDetails } from "../../store/spots";
import "./EditSpot.css"

const EditSpotForm = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const spot = useSelector(state => state.spots.singleSpot);

    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [updateErrors, setUpdateErrors] = useState([]);

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);


    useEffect(() => {
        const errors = [];

        if(!address || address.length > 25 || address.length < 5) errors.push("Address must be greater than 5 characters and less than 25.");
        if(!city || city.length > 25 || city.length < 3) errors.push("City must be greater than 3 characters and less than 25.");
        if(!state || state.length > 25 || city.length < 1) errors.push("State must be greater than 1 character and less than 25.");
        if(!country) errors.push("Country is required");
        if(!name) errors.push("Name is required");
        if(!description) errors.push("Description is required");
        if(name.length > 50 ) errors.push("Name exceeds character limit");
        if(!price || price < 0) errors.push("Price is required");
        if(isNaN(price)) errors.push("Price needs to be a number");

        setUpdateErrors(errors);
    }, [address, city, state, country, name, description, price]);


    useEffect(() => {
        dispatch(getSpotDetails(spotId))
    }, [dispatch, spotId])

    if (!Object.keys(spot).length) return null;

    const handleSubmit = async(e) => {
        e.preventDefault();

        const payload = {
            address,
            city,
            state,
            country,
            name,
            description,
            price
        };
    
    let updatedSpot = await dispatch(editSpot(payload, spotId));
    
    if(!Object.keys(spot).length) return null;

    if (updatedSpot) history.push(`/spots/${updatedSpot.id}`);
    
    };

    const cancel = (e) => {
        e.preventDefault();
        history.push(`/spots/${spotId}`);
    };


    return (
        <div id=
    );



}

