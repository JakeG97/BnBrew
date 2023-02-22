const express = require('express');
const { Spot, SpotImage, Review, ReviewImage, User, Booking} = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// get all reviews from current user
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id

    const reviews = await Review.findAll({
        include: [
            {
                model: User, as: 'User',
                attributes:
                    { exclude: ['email', 'hashedPassword', 'username', 'createdAt', 'updatedAt'] }
            },
            {
                model: Spot, as: "Spot",
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'description']
                },
                include: {
                    model: SpotImage,
                    where: { preview: true },
                    attributes: ['url']
                }
            },
            {
                model: ReviewImage, as: "ReviewImages",
                attributes:
                    { exclude: ['reviewId', 'createdAt', 'updatedAt'] }
            },

        ],
        where: {
            userId: userId
        },
    });

    for (let i = 0; i < reviews.length; i++) {
        let resPreview = reviews[i].toJSON();

        let spotImageUrl = resPreview.Spot.SpotImages[0];

        if (spotImageUrl) {
            resPreview.Spot.previewImage = spotImageUrl.url
        } else {
            resPreview.Spot.previewImage = 'No Image Available'
        }
        delete resPreview.Spot.SpotImages;
        reviews[i] = resPreview;
    };

    return res.json({ Reviews: reviews })
});


module.exports = router;