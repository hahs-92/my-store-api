'use strict';

const { CustomerSchema, CUSTOMER_TABLE } = require('../models/customer.model')
//AQUI IRIAN LOS OTROS MODELOS 'PRODUCTOS'


module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema)
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(CUSTOMER_TABLE)
  }
};
