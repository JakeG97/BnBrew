import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { editSpot } from "../../store/spots";
import "./EditSpot.css"

const EditSpotForm = () =>{
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    
    const id =parseInt(spotId)
    const spot = useSelector((state) => state.spots[id]);
    const user = useSelector((state) => state.session.user);
  
    const [ownerId, setOwnerId] = useState(null);
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [ValidationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
  
    const updateCountry = (e) => setCountry(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
  
    useEffect(()=>{
        setAddress(spot.address)
        setCity(spot.city)
        setState(spot.state)
        setCountry(spot.country)
        setName(spot.name)
        setDescription(spot.description)
        setPrice(spot.price)
    },[spot])
  
    useEffect(() => {
      
      const errors = [];
      if (!user) errors.push("Please Log In");
      if (!country) errors.push("Country is required");
      if (!address) errors.push("Address is required");
      if (!city) errors.push("City is required");
      if (!state) errors.push("State is required");
      if (!name) errors.push("Spot Name is required");
      if (!description) errors.push("Description is required");
      if (name.length > 50 || name.length < 3 ) errors.push("Name must be greater than 3 characters and less than 50");
      if (!price) errors.push("Price Per Day is Required");
  
      setValidationErrors(errors);
  
      if (user) setOwnerId(user?.id);
  
    }, [user, address, city, country, description, name, price, state]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      setHasSubmitted(true);
      if (ValidationErrors.length) return alert(`Cannot Submit`);
  
      const payload = {
        ...spot,
        ownerId,
        address,
        city,
        country,
        description,
        name,
        price,
        state,
      };
  
      let updatedSpot = await dispatch(editSpot(payload));
      if (updatedSpot) {
          
        history.push(`/spots/${updatedSpot.id}`);
      }
    };
  
    return spot && (
      <div className="edit-div">
        {user.id === +ownerId && (
          <form onSubmit={handleSubmit}>
            <div className="edit-container">
              <h1>Edit a Spot</h1>
            </div>
  
            {ValidationErrors.length > 0 && (
              <div className="edit-errors">
                <ul className="edit-blocks">
                  {ValidationErrors.map((error) => (
                    <li className="edit-text" key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
  
            <div>
              <div className="edit-forms">
                <input
                  className="edit-input"
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={updateCountry}
                />
              </div>
              <div className="edit-forms">
                <input
                  className="edit-input"
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={updateAddress}
                />
              </div>
              <div className="edit-forms">
                <input
                  className="edit-input"
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={updateCity}
                />
              </div>
              <div className="edit-forms">
                <input
                  className="edit-input"
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={updateState}
                />
              </div>
  
              <div className="edit-forms">
                <input
                  className="edit-input"
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={updateDescription}
                />
              </div>
  
              <div className="edit-forms">
                <input
                  className="edit-input"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={updateName}
                />
              </div>
              <div className="edit-forms">
                <input
                  className="edit-input"
                  type="text"
                  placeholder="Price"
                  value={price}
                  onChange={updatePrice}
                />
              </div>
            </div>
            <div className="edit-forms">
              <button className="edit-button" type="submit">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }
  export default EditSpotForm