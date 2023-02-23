const express = require('express');
const { Booking, User, Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const sequelize = require('sequelize');
const booking = require('../../db/models/booking');


// get all of the current user's bookings
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id
    const currBookings = await Booking.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            },

        ],
    });

    for (let i = 0; i < currBookings.length; i++) {
        let bookingsPreview = currBookings[i].toJSON();

        let bookingImg = bookingsPreview.Spot.id;
        const spotImg = await SpotImage.findOne({
            where: {
                spotId: bookingImg,
                preview: true
            }
        });

        if (spotImg) {
            bookingsPreview.Spot.previewImage = spotImg.url
        } else {
            bookingsPreview.Spot.previewImage = 'No image available '
        }
        currBookings[i] = bookingsPreview;
    };

    return res.json({ Bookings: currBookings })
});











module.exports = router;