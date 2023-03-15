import "./ReviewForm.css"

export default function Reviews({review}){

    if (review.stars === 0) review.stars = "No Revies Yet"

    return (
        <div>
            {review.stars}
            <div>
                <h2 className="review-div">Reviews</h2>
                {Object.values(review).map((review) => (
                    <div className="star-block" key={review.id}>
                        <div className="name">Review by: {review.User?.firstName}
                        </div>
                            <div className="name">{review.review}
                            </div>
                                <div id="star" className="fas fa-sold fa-star"> {review.stars}
                                </div>    
                    </div>
                ))}
            </div>
        </div>
    );
}