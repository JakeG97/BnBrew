const express = require('express');
const { Spot, SpotImage, Review, ReviewImage, User, Booking} = require('../../db/models');
const { requireAuth } = require('../utils/auth');
const router = express.Router();

