import "./CreateSpotForm.css"
import { addSpot } from "../../store/spots"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

const CreateSpotForm = () => {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [ownerId, setOwnerId] = useState(null);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [state, setState] = useState("");
    const [image, setImage] = useState("");
    const [ValidationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = [];

        if(!user) errors.push("Please Log In");
        if(!address) errors.push("Address is required");
        if(!country) errors.push("Country is required");
        if(!city) errors.push("City is required");
        if(!state) errors.push("State is required");
        if(!description) errors.push("Description is required");
        if(description.length < 30) errors.push("Desctiption needs a minimum of 30 characters")
        if(!name) errors.push("Name is required");
        if(name.length > 50 ) errors.push("Name exceeds character limit");
        if(!price) errors.push("Price is required");
        if(isNaN(price)) errors.push("Price needs to be a number");
        if (!image.endsWith(".jpg") &&
            !image.endsWith(".png") &&
            !image.endsWith(".jpeg")
        ) {
            errors.push("Please provide a valid image");
        }

        setValidationErrors(errors);

        if(user) setOwnerId(user?.id);
    }, [user, address, city, country, description, name, price, state, image]);

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateImage = (e) => setImage(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);
        if(ValidationErrors.length) return alert("Cannot Submit");

        const payload = {
            ownerId,
            address,
            city,
            country,
            description,
            name,
            price,
            state,
            url: image,
        };

        let addedSpot = await dispatch(addSpot(payload));
        if(addedSpot) {
            history.push(`/spots/${addedSpot.id}`);
        }
        history.replace("/");
    };

    return (
        <div className="head-div">
          <form onSubmit={handleSubmit}>
            {!user && <h1 className="signin-error">Please Sign In</h1>}
            <div className="header">
              <h1>Create a Spot</h1>
            </div>
            <div className="input-container">
              <div className="create-input">
                <input
                  className="inputs"
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={updateAddress}
                />
                {ValidationErrors.map((error) => {
                  if (error.includes("Address")) {
                    return <div className="error-text">{error}</div>;
                  }
                })}
              </div>
              <div className="create-input">
                <input
                  className="inputs"
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={updateCity}
                />
                {ValidationErrors.map((error) => {
                  if (error.includes("City")) {
                    return <div className="error-text">{error}</div>;
                  }
                })}
              </div>
              <div className="create-input">
                <input
                  className="inputs"
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={updateState}
                />
                {ValidationErrors.map((error) => {
                  if (error.includes("State")) {
                    return <div className="error-text">{error}</div>;
                  }
                })}
              </div>
              <div className="create-input">
                <input
                  className="inputs"
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={updateCountry}
                />
                {ValidationErrors.map((error) => {
                  if (error.includes("Country")) {
                    return <div className="error-text">{error}</div>;
                  }
                })}
              </div>
              <div className="create-input">
                <input
                  className="inputs"
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={updateDescription}
                />
                {ValidationErrors.map((error) => {
                  if (error.includes("Description")) {
                    return <div className="error-text">{error}</div>;
                  }
                })}
              </div>
              <div className="create-input">
                <input
                  className="inputs"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={updateName}
                />
                {ValidationErrors.map((error) => {
                  if (error.includes("Name")) {
                    return <div className="error-text">{error}</div>;
                  }
                })}
              </div>
              <div className="create-input">
                <input
                  className="inputs"
                  type="text"
                  placeholder="Price"
                  value={price}
                  onChange={updatePrice}
                />
                {ValidationErrors.map((error) => {
                  if (error.includes("Price")) {
                    return <div className="error-text">{error}</div>;
                  }
                })}
              </div>
              <div className="create-input">
                <input
                  className="inputs"
                  type="text"
                  placeholder="Image"
                  value={image}
                  onChange={updateImage}
                />
                {ValidationErrors.map((error) => {
                  if (error.includes("image")) {
                    return <div className="error-text">{error}</div>;
                  }
                })}
              </div>
              <div className="create-input">
                <button className="submit-button" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
    );
}

export default CreateSpotForm;