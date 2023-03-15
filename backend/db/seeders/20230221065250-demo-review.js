"use strict";

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
      }
    ], options);
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id : {[Op.in] : [1, 2, 3]}
    }, {})
  },
};