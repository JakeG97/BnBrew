"use strict";
const bcrypt = require("bcryptjs");
const {Op} = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/* @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: "Beautiful beach setting with beer to help compliment the warm weather. The outdoor patio was awesome!",
        stars: 5,
      },
      {
        spotId: 2,
        userId: 2,
        review: "A little small of a setting for my taste but some of the best IPA's out there.",
        stars: 4,
      },
      {
        spotId: 3,
        userId: 2,
        review: "If you like Hazy IPA's this place is awesome... I hate Hazy IPA's..",
        stars: 2,
      },
      {
        spotId: 4,
        userId: 3,
        review: "The town really doesn't have much to offer.. but if there's one thing it does, it's this amazing brewery!",
        stars: 5,
      },
      {
        spotId: 5,
        userId: 1,
        review: "I have yet to have a beer from them that dissapoints so I had to check out the brewery and I was not dissapointed.",
        stars: 5,
      },
      {
        spotId: 6,
        userId: 1,
        review: "I think the palce was really nice but man there beer is strong, I can't really remember",
        stars: 3,
      },
      {
        spotId: 7,
        userId: 2,
        review: "Stone brewing really put's the stone cold chill in their beer, was so cold my mouth went numb!",
        stars: 4,
      },
      {
        spotId: 8,
        userId: 4,
        review: "I had heard all the hype and they did not dissapoint!",
        stars: 5,
      }
    ], options);
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {
      id : {[Op.in] : [1, 2, 3]}
    }, {})
  },
};