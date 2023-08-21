'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('collaborateur', {
      id_collaborateur: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email_collaborateur: {
        type: Sequelize.STRING
      },
      libelle_collaborateur: {
        type: Sequelize.STRING
      },
      id_projet: {
        type: Sequelize.INTEGER,
        references: {
          model: 'projet',
          key: 'id_projet'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('collaborateur');
  }
};
