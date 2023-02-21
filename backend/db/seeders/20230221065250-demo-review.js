"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  Up: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: "Very hot but fairly nice house. Also found a nice amount of cash in the basement which was left for some guy named Ted?",
        stars: 5,
      },
      {
        spotId: 2,
        userId: 2,
        review: "Super cozy house, with a lot of handcarved wood figurines. Could really feel the country breathing through.",
        stars: 1,
      },
      {
        spotId: 3,
        userId: 2,
        review: "This place was horrible. I swear a dragon was flying above the place, every other minute.",
        stars: 3,
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {
      id : {[Op.in] : [1, 2, 3]}
    }, {})
  },
};