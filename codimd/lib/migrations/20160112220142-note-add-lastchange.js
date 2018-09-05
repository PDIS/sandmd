'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Notes', 'lastchangeuserId', {
      type: Sequelize.UUID
    }).then(function () {
      return queryInterface.addColumn('Notes', 'lastchangeAt', {
        type: Sequelize.DATE
      })
    }).catch(function (error) {
      if (error.message === "ER_DUP_FIELDNAME: Duplicate column name 'lastchangeuserId'") {
        console.log('Migration has already run… ignoring.')
      } else {
        throw error
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Notes', 'lastchangeAt')
    .then(function () {
      return queryInterface.removeColumn('Notes', 'lastchangeuserId')
    })
  }
}
