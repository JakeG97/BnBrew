import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import { getSpotDetails } from "../../store/spots";
import "./EditSpot.css"

const EditSpotForm = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();



    const [ownerId, setOwnerId] = useState(null);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [state, setState] = useState("");
    const [ValidationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateState = (e) => setState(e.target.value);

    useEffect(() => {
        setAddress(spot.address)
        setCity(spot.city)
        setCountry(spot.country)
        setDescription(spot.description)
        setName(spot.name)
        setPrice(spot.price)
        setState(spot.state)
    }, [spot])

    useEffect(() => {
        const errors = [];

        if(!user) errors.push("Please Log In");
        if(!address) errors.push("Address is required");
        if(!country) errors.push("Country is required");
        if(!city) errors.push("City is required");
        if(!state) errors.push("State is required");
        if(!description) errors.push("Description is required");
        if(!name) errors.push("Name is required");
        if(name.length > 50 ) errors.push("Name exceeds character limit");
        if(!price) errors.push("Price is required");
        if(isNaN(price)) errors.push("Price needs to be a number");

        setValidationErrors(errors);

        if(user)setOwnerId(user?.id);
    }, [user, address, city, country, description, name, price, state]);

}