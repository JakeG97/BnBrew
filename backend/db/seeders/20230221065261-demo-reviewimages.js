'use strict';
const bcrypt = require("bcryptjs");
const {Op} = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/* @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'https://lagunitas.com/wp-content/uploads/2022/06/MicrosoftTeams-image-17-1024x683-3.jpg',
      },{
        reviewId: 2,
        url: 'https://brewpublic.com/wp-content/uploads/2018/08/Outdoor-seating-at-the-Boneyard-Pub-in-Bend-Oregon.-photo-by-Cat-Stelzer.jpg',
      },{
        reviewId: 3,
        url: 'https://s.hdnux.com/photos/71/15/52/14998173/17/rawImage.jpg',
      }
    ], options)
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkDelete(options, {
      id : {[Op.in] : [1, 2, 3]}
    }, {})
  }
};