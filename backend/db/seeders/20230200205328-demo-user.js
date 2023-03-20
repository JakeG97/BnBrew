'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Billy',
        lastName: 'Bob',
        email: 'billy@bob.io',
        username: 'BobBilly',
        hashedPassword: bcrypt.hashSync('iLoveRanchDressing')
      },
      {
        firstName: 'Jimmy',
        lastName: 'Johnson',
        email: 'JJ97@gmail.com',
        username: 'SlimJim',
        hashedPassword: bcrypt.hashSync('slimmy')
      },
      {
        firstName: 'Joe',
        lastName: 'Dirt',
        email: 'DSpade@comedy.org',
        username: 'JoeDirt',
        hashedPassword: bcrypt.hashSync('BillyRay')
      },
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'Demo@user.org',
        username: 'DemoUser',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], options);
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['BobBilly', 'SlimJim', 'JoeDirt', 'DemoUser'] }
    }, {});
  }
};