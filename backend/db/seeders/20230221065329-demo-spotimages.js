'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/* @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://pv-magazine-usa.com/wp-content/uploads/sites/2/2021/08/Exterior-Beer-Garden-E-DSC8829-1200x801.jpeg",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://brewpublic.com/wp-content/uploads/2018/08/The-Boneyard-Pub-in-Bend-Oregon.-photo-by-Cat-Stelzer.jpg",
        preview: true,
      },{
        spotId: 3,
        url: "https://dzz2p2kq5g45d.cloudfront.net/wp-content/uploads/2020/05/16113959/img-03.jpg",
        preview: true,
      }
    ], options)
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id : {[Op.in] : [1, 2, 3]}
    }, {})
  }
};