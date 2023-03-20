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
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
      id: 1,
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
      id: 2,
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
      id: 3,
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
    },{
      id: 4,
      ownerId: 4,
      address: "1885 MacArthur DR",
      city: "Tracy",
      state: "California",
      country: "USA",
      lat: 122.3024,
      lng: 37.8812,
      name: "Morgan Territory Brewing",
      description: "Morgan Territory Brewing is taking on the Wild West. Named after a historic ranch located on the “morning side” of Mount Diablo, Morgan Territory Brewing is dedicated to the rich, independent character of the early pioneers that made California great.",
      price: 6.00
  },{
    id: 5,
    ownerId: 1,
    address: "322 Bellevue Ave",
    city: "Santa Rosa",
    state: "California",
    country: "USA",
    lat: 122.3035,
    lng: 37.8862,
    name: "HenHouse Brewing Company",
    description: "HenHouse Brewing Company makes some of the best tasting beers that you can get and each and every one of them has a story to tell... literally, look on the side of the can!",
    price: 5.00
  },{
    id: 6,
    ownerId: 2,
    address: "380 S Rock Blvd",
    city: "Sparks",
    state: "Nevada",
    country: "USA",
    lat: 123.3024,
    lng: 34.8812,
    name: "Revision Brewing Company",
    description: "Revision Brewing Company is a craft beer brewery and taproom located in a 30,500 sq. ft. building just off Interstate 80 in industrial Sparks, Nevada. Enjoy a range of available beer styles in your choice of atmosphere.",
    price: 6.00
  },{
    id: 7,
    ownerId: 3,
    address: "220 S. Raymond Ave",
    city: "Pasadena",
    state: "California",
    country: "USA",
    lat: 123.4024,
    lng: 34.5812,
    name: "Stone Brewing Tap Room",
    description: "Stone Brewing Tap Room - Pasadena is a tasting room and retail store with patio space in the Del Mar Metro Station complex (formerly the historic Santa Fe train depot).",
    price: 10.00
  },{
    id: 8,
    ownerId: 2,
    address: "725 4th Street",
    city: "Santa Rosa",
    state: "California",
    country: "USA",
    lat: 131.4024,
    lng: 34.6212,
    name: "Russian River Brewing Company",
    description: "Famous for their hoppy, crisp tasting beers, Russian River makes you upset you tried their brew.. because no other drink will taste just as good.",
    price: 13.00
  }
    ], options)
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkDelete(options, {
      name : { [Op.in]: ["Lagunitas Brewing Company", "Boneyard Pub", "Fieldwork Brewing Company",
                        "Morgan Territory Brewing", "HenHouse Brewing Company", "Revision Brewing Company",
                        "Stone Brewing Tap Room", "Russian River Brewing Company"
    ] }
    }, {})
  }
};