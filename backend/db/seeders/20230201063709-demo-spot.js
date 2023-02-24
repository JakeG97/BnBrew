'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/* @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
      ownerId: 1,
      address: "308 Negra Arroyo Lane",
      city: "Albuquerque",
      state: "New Mexico",
      country: "USA",
      lat: 106.6504,
      lng: 35.0844,
      name: "Walter White's House",
      description: "Former Chemist teacher turned criminal's original house.",
      price: 900000.00
    },{
      ownerId: 2,
      address: "50 Glenwood St.",
      city: "Jackson",
      state: "Wyoming",
      country: "USA",
      lat: 110.7624,
      lng: 43.4799,
      name: "Joel Miller's Estate",
      description: "Cozy, farm house with a history of being a safe haven in another time.",
      price: 1200000.00
    },{
      ownerId: 3,
      address: "12 UpperWild Woods",
      city: "Midgard",
      state: "World Tree",
      country: "Scandinavia",
      lat: 12.3402,
      lng: 62.2786,
      name: "Kratos' Home",
      description: "A warm cabin with a roof tall enough to contain a giant with a rich estate full of fields of snow.",
      price: 20.00
    }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name : { [Op.in]: ["Walter White's House", "Joel Miller's Estate", "Kratos' Home"] }
    }, {})
  }
};