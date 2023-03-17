import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { createReview } from "../../store/reviews";


const CreateReviewForm = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user)
    const reviews = useSelector((state) => state.reviews)

    const [stars, setStars] = useState(0);
    const [review, setReview] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        const payload = {
            review,
            stars
        }
        let addedReview = await dispatch(createReview(payload, spotId))

        if (addedReview) {
            history.push(`/spots/${spotId}`)
        }
    }
}