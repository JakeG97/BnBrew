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
    let { page, size} = req.query;
    page = parseInt(page);
    size = parseInt(size)

    const pagination = {}

    if(!page) page = 1;
    if (!size) size = 20;

    if (page >= 1 && size >=1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }

    const allSpots = await Spot.findAll({
        ...pagination
    });

    for (let spot of allSpots) {
        const findImg = await SpotImage.findOne({
            attributes: ["url"],
            where: {
                spotId: spot.id,
                preview: true
            },
            raw: true
        });

        if (findImg) {
            spot.dataValues.previewImg = findImg.url;
        } else {
            spot.dataValues.previewImg = null;
        }

        const findReview = await spot.getReviews({
            attributes: [
                [sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]
            ]
        });
        const avg = findReview[0].dataValues.avgRating
        const resAvg = Number(avg).toFixed(2)

        if (findReview) {
            spot.dataValues.avgRating = resAvg;
        } else {
            spot.dataValues.avgRating = "";
        }
    }
    res.status(200);
    res.json({
        "Spots": allSpots,
        "page": page,
        "size": size
    });
});

// get spots owned by current User
router.get("/current", requireAuth, async (req, res) => {
    const currSpot = await Spot.findAll({
      where: {
        ownerId: req.user.id,
      },
    });
  
    for (let spot of currSpot) {
      const findImg = await SpotImage.findOne({
        attributes: ["url"],
        where: {
          preview: true,
          spotId: spot.id,
        },
        raw: true,
      });
  
      if (findImg) {
        spot.dataValues.previewImage = findImg.url;
      } else {
        spot.dataValues.previewImage = null;
      }
  
      const findReview = await spot.getReviews({
        attributes:
        [
          [ sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]
      ],
  
      });
       const avg = findReview[0].dataValues.avgRating;
       const avgRes = Number(avg).toFixed(2);
      if (findReview) {
        spot.dataValues.avgRating = avgRes
      } else {
        spot.dataValues.avgRating = "";
      }
    }
    res.status(200);
    return res.json({
      Spots: currSpot,
    });
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

// get all bookings for a spot based on the spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
    };

    const spotBookings = await Booking.findAll({
        where: {
            spotId: spotId
        },
        include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] }]
    });

    const wrongOwnerFilter = await Booking.findAll({
        where: {
            spotId: spotId
        },
        attributes: ['spotId', 'startDate', 'endDate']
    });

    if (userId === spot.ownerId) {
        return res.json({ Bookings: spotBookings })
    } else {
        return res.json({ Bookings: wrongOwnerFilter })
    };

});

// create a booking from a spot based on spot's id
router.post("/:spotId/bookings", requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const { spotId } = req.params;
    const userId = req.user.id;
  
    const findSpot = await Spot.findByPk(spotId);
  
    if (!findSpot) {
      res.status(404);
      res.json({
        message: "Spot couldn't be found",
        statusCode: 404,
      });
    }
    const getAllBookings = await Booking.findAll({
      where: {
        spotId: spotId,
        startDate: { [Op.lte]: endDate },
        endDate: { [Op.gte]: startDate },
      },
    });
  
    if (getAllBookings.length >= 1) {
      res.status(403);
      return res.json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }
  
    const createBooking = await Booking.create({
      userId,
      spotId,
      startDate,
      endDate,
    });
  
    res.status(200);
    res.json(createBooking);
  });



module.exports = router;