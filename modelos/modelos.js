const Sequelize = require('sequelize');

const Modelos = sequelize.define('modelos',{
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: Sequelize.STRING
});

async function getAllModelos(){
    const datos = await Modelos.findAll({
    });
    return datos;
  
  }

module.exports = {Modelos, getAllModelos}