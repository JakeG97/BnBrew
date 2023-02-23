const express = require('express');
const { Booking, User, Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const sequelize = require('sequelize');
const booking = require('../../db/models/booking');
const { Op } = require('sequelize');


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

// edit a booking
router.put('/:bookingId',requireAuth, async(req, res) => {
    const { bookingId } = req.params

    const { startDate, endDate } = req.body

    const editBookings = await Booking.findByPk(bookingId)

        if(!editBookings){
           return res.json({
             message: "Booking couldn't be found",
             statusCode: 404,
           });
        }

    const getAllBookings = await Booking.findAll({
      where: {
        spotId: editBookings.spotId,
        startDate: { [Op.lte]: endDate },
        endDate: { [Op.gte]: startDate },
      },
    });

       if (editBookings.endDate < Date.now()) {
         res.status(403);
         return res.json({
           message: "Past bookings can't be modified",
           statusCode: 403,
         });
       }
    if(getAllBookings.length >= 1){
      res.status(403)
      return res.json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
      }
      if(endDate < startDate){
        res.status(400)
        return res.json({
          message: "Validation error",
          statusCode: 400,
          errors: {
            endDate: "endDate cannot come before startDate",
          },
        });
    }
    if(editBookings){
        editBookings.set({
            startDate,
            endDate
        })
        await editBookings.save()
         return res.json(editBookings)
    }else {
      res.status(404)
      return res.json({
        message: "Booking couldn't be found",
        statusCode: 404,
      });
    }
})









module.exports = router;