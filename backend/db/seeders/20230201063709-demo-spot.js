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
      address: "1280 N McDowell Blvd",
      city: "Petaluma",
      state: "California",
      country: "USA",
      lat: 122.6627,
      lng: 38.2721,
      name: "Lagunitas Brewing Company",
      description: "The Lagunitas Brewing Company, founded in 1993 in Lagunitas, California, is a subsidiary of Heineken International.",
      price: 8.00
    },{
      ownerId: 2,
      address: "37 Division Street",
      city: "Bend",
      state: "Oregon",
      country: "USA",
      lat: 121.3081,
      lng: 44.0540,
      name: "Boneyard Pub",
      description: "No-nonsense neighborhood brewery offering a large assortment of craft beers to go.",
      price: 9.00
    },{
      ownerId: 3,
      address: "1805 Capitol Ave",
      city: "Berkley",
      state: "California",
      country: "USA",
      lat: 122.3023,
      lng: 37.8813,
      name: "Fieldwork Brewing Company",
      description: "Brewpub with a variety of seasonal house beer blends, in an industrial setting.",
      price: 12.00
    }
    ], options)
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name : { [Op.in]: ["Lagunitas Brewing Company", "Boneyard Pub", "Fieldwork Brewing Company"] }
    }, {})
  }
};