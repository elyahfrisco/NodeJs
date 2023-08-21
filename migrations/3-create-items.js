'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('items', {
      id_item: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      libelle: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      qrcode: {
        type: Sequelize.STRING
      },
      id_projet: {
        type: Sequelize.INTEGER,
        references: {
          model: 'projet',
          key: 'id_projet'
        }
      },
      id_categorie: {
        type: Sequelize.INTEGER
        // Vous pouvez ajouter une référence ici si nécessaire
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('items');
  }
};
