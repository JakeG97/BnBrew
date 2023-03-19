import { useState } from "react";
import CreateReviewForm from "../CreateReviewForm";
import "./ReviewModal.css"

const ReviewModal = ({ spotId, userOwner }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
        {!userOwner && (
            <button className="create-review-button" onClick={handleOpen}>
                Post Your Review
            </button>
        )}
        {isOpen && (
            <div className="modal">
                <div className="modal-content">
                    <button className="modal-close" onClick={handleClose}>
                        &times;
                    </button>
                    <CreateReviewForm spotId={spotId} handleClose={handleClose} />
                </div>
            </div>
        )}
    </>
    );
};

export default ReviewModal;
