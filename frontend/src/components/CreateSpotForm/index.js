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

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateImage = (e) => setImage(e.target.value);
    
    useEffect(() => {

        const errors = [];

        if(!user) errors.push("Please Log In");
        if(!address) errors.push("Address is required");
        if(!country) errors.push("Country is required");
        if(!city) errors.push("City is required");
        if(!state) errors.push("State is required");
        if(!description) errors.push("Description is required");
        if(description.length < 30) errors.push("Description needs a minimum of 30 characters")
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
    };

    return (
        <div className="edit-div">
          <form onSubmit={handleSubmit}>
            {!user && <h1 className="signin-error">Please Sign In</h1>}
            <div className="edit-container">
                <h1 className="title">Create a Spot</h1>
                <h2 className="title-description">Where's your place located?</h2>
                <p className="booking">Guests will only get an exact address once they've booked a reservation.</p>
            </div>

            {hasSubmitted && ValidationErrors.length > 0 && (
              <div className="edit-errors">
                <ul className="edit-blocks">
                  {ValidationErrors.map((error) => (
                    <li className="edit-text" key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="edit-forms-container">
              <div className="edit-forms">
                <p id="input-title">Country</p>
                <input
                  className="edit-input"
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={updateCountry}
                />
              </div>
              <div className="edit-forms">
                <p id="input-title">Address</p>
                <input
                  className="edit-input"
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={updateAddress}
                />
              </div>
              <div className="edit-forms">
                <p id="input-title">City</p>
                <input
                  className="edit-input"
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={updateCity}
                />
              </div>
              <div className="edit-forms">
                <p id="input-title">State</p>
                <input
                  className="edit-input"
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={updateState}
                />
              </div>
              <div className="edit-forms">
              <h2 className="big-input-title">Describe your place to guests</h2>
              <p className="input-labels">Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
              <textarea
                id="desc-box"
                className="edit-input"
                placeholder="Please write at least 30 characters"
                value={description}
                onChange={updateDescription}
              ></textarea>
              </div>
              <div className="edit-forms">
              <h2 className="big-input-title">Create a title for your Spot</h2>
              <p className="input-labels">Catch guests' attention with a spot title that highlights what makes your place special</p>
                <input
                  className="edit-input"
                  type="text"
                  placeholder="Name of your spot"
                  value={name}
                  onChange={updateName}
                />
              </div>
              <div className="edit-forms">
              <h2 className="big-input-title">Set a base price for your spot</h2>
              <p className="input-labels">Competitive Pricing can help your listing stand out and rank higher in search results.</p>
              <span className="dollar-sign">$</span>
                <input
                  className="edit-input"
                  type="text"
                  placeholder="Price per cheapest brew (USD)"
                  value={price}
                  onChange={updatePrice}
                />
              </div>
              <div className="edit-forms">
              <h2 className="big-input-title">Liven up your spot with photos</h2>
              <p className="input-labels">Submit a link to at least one photo to publish your spot</p>
                <input
                  className="edit-input"
                  type="text"
                  placeholder="Preview Image URL"
                  value={image}
                  onChange={updateImage}
                />
                {/* <input
                  className="edit-input"
                  type="text"
                  placeholder="Image URL"
                  value={image}
                  onChange={updateImage}
                />
                <input
                  className="edit-input"
                  type="text"
                  placeholder="Image URL"
                  value={image}
                  onChange={updateImage}
                />
                <input
                  className="edit-input"
                  type="text"
                  placeholder="Image URL"
                  value={image}
                  onChange={updateImage}
                />
                <input
                  className="edit-input"
                  type="text"
                  placeholder="Image URL"
                  value={image}
                  onChange={updateImage}
                /> */}
                {ValidationErrors.map((error) => {
                  if (error.includes("image")) {
                    return <div className="error-text">{error}</div>;
                  }
                })}
              </div>
              <div className="edit-forms">
                <button id="edit-button" onClick={handleSubmit}>
                  Create Spot
                </button>
              </div>
            </div>
          </form>
        </div>
    );
}

export default CreateSpotForm;