'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://na.rdcpix.com/625946635/a545dc497c1d4e1385851ca5e12f5a14w-c0rd-w832_h468_r4_q80.webp",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://static1.dualshockersimages.com/wordpress/wp-content/uploads/2021/11/last-of-us.jpg",
        preview: true,
      },{
        spotId: 3,
        url: "https://static.wikia.nocookie.net/godofwar/images/0/0f/KratosCabin01.jpg/revision/latest/scale-to-width-down/1000?cb=20200810074556",
        preview: true,
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, {
      id : {[Op.in] : [1, 2, 3]}
    }, {})
  }
};