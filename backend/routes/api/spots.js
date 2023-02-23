const express = require('express');
const { Spot, SpotImage, Review, ReviewImage, User, Booking} = require('../../db/models');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// get all spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll();
    res.status(200).json({Spots: spots});
});

// get spots owned by current User
router.get('/current', requireAuth, async (req, res) => {
    const ownerId = req.user.id

    const spots = await Spot.findAll({
        where: {
            ownerId: ownerId
        },

    });

    let avgRating;
    for (let i = 0; i < spots.length; i++) {
        const reviewCount = await Review.count({ where: { spotId: spots[i].id } })
        const sumOfStars = await Review.sum('stars', {
            where: { spotId: spots[i].id }
        });

        if (!sumOfStars) {
            avgRating = 0;
        } else {
            avgRating = (sumOfStars / reviewCount).toFixed(1);
        }

        spots[i].avgRating = avgRating;

        const spotImage = await SpotImage.findOne({
            where: { spotId: spots[i].id },
            attributes: ['id', 'url', 'preview']
        });

        if (spotImage) spots[i].previewImage = spotImage.url;
        else spots[i].previewImage = 'No Image Available'

    }
    
    return res.json({ Spots: spots, avgRating})
});

// get details of a spot from an id
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params
    const details = await Spot.findByPk(spotId, {
        include: {
            model: User, as: 'Owner',
            attributes: ['id', 'firstName', 'lastName']
        }
    });  

    if (!details) {
        return res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: res.statusCode
            })
    };

    const reviewCount = await Review.count({ where: { spotId: spotId } })

    const sumOfStars = await Review.sum('stars', {
        where: { spotId: spotId }
    });

    let avgRating = (sumOfStars / reviewCount).toFixed(1);

    const spotImage = await SpotImage.findAll({
        where: { spotId: spotId },
        attributes: ['id', 'url', 'preview'],

    });


    const resDetails = details.toJSON();
    resDetails.numReviews = reviewCount;
    resDetails.avgRating = Number(avgRating);
    resDetails.SpotImages = spotImage;


    return res.json(resDetails)
});


// create a spot
router.post('/', async (req, res) => {
    const user = req.user
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    try {
        const newSpot = await Spot.create({
            ownerId: user.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });

        return res.json(newSpot)
    } catch {
        res.statusCode = 400;
        return res.json({
            message: "Validation Error",
            statusCode: res.statusCode,
            errors: {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }
        });

    };
});


// add an image to a spot
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { url } = req.body;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: res.statusCode,
            })
    }

    const newSpotImg = await SpotImage.create({
        spotId: parseInt(spotId),
        url: url,
        preview: true,

    });
    res.json({
        id: newSpotImg.id,
        url: newSpotImg.url,
        preview: newSpotImg.preview
    });


});


//edit a spot
router.put('/:spotId', async (req, res) => {
    const { spotId } = req.params;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res
            .status(404)
            .json({
                "message": "Spot couldn't be found",
                "statusCode": res.statusCode
            });
    };

    try {
        await spot.update({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });
        return res.json(spot);

    } catch (error) {
        res
            .status(400)
            .json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "address": "Street address is required",
                    "city": "City is required",
                    "state": "State is required",
                    "country": "Country is required",
                    "lat": "Latitude is not valid",
                    "lng": "Longitude is not valid",
                    "name": "Name must be less than 50 characters",
                    "description": "Description is required",
                    "price": "Price per day is required"
                }
            });
    }
});

// delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const userId = req.user.id;
    const deleteSpot = await Spot.findByPk(spotId);

    if (!deleteSpot) {
        return res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: 404
            });
    };

    if (deleteSpot.ownerId === userId) {
        deleteSpot.destroy();
        return res
            .status(200)
            .json({
                message: "Successfully deleted",
                statusCode: 200
            });
    } else {
        return res.json({
            message: "You do not own this location, therefore you can not delete",
        })
    }
});


// get all reviews by spot id
router.get('/:spotId/reviews', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if(!spot) {
        res.status(404)
        return res.json({
            message: 'Spot could not be found',
            "statusCode": 404
        })
    }

    const reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: [ 'id', 'firstName', 'lastName' ]
            },
            {
                model: ReviewImage,
                attributes: [ 'id', 'url' ]
            }
        ]
    })

    return res.json({ Reviews: reviews })
})


// create a review for a spot based on spot id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);


    if (!spot) {
        return res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
    };

    
    const existingReview = await Review.findOne({
        where: {
            userId: req.user.id,
            spotId: spotId
        }
    });
    
    if (existingReview) {
        return res
            .status(403)
            .json({
                message: "User already has a review for this spot",
                statusCode: 403
            });
    };

    try {
        const newReview = await Review.create({
            userId: req.user.id,
            spotId: Number(spotId),
            review: req.body.review,
            stars: req.body.stars
        });
        return res.json(newReview)

    } catch (error) {
        return res
            .status(400)
            .json({
                message: 'Validation error',
                statusCode: 400,
                errors: {
                    review: 'Review text is required',
                    stars: 'Stars must be an integer from 1 to 5'
                }
            });
    };

});



module.exports = router;