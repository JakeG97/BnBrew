import "./ReviewForm.css";

export default function Reviews({ reviews }) {
  if (!reviews) {
    return null;
  }

  return (
    <div>
      <h2 className="review-div">Reviews</h2>
      {reviews.map((review) => (
        <div className="star-block" key={review.id}>
          <div className="name">Review by: {review.User?.firstName}</div>
          <div className="name">{review.review}</div>
          <div id="star" className="fas fa-sold fa-star">
            {review.stars}
          </div>
        </div>
      ))}
    </div>
  );
}