const Sequelize = require('sequelize');

const Usuarios = sequelize.define('usuarios',{
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: Sequelize.STRING,
    apellido: Sequelize.STRING,
    correo: Sequelize.STRING,
    telefono: Sequelize.INTEGER,
    clave: Sequelize.STRING,
    perfil: Sequelize.STRING,
})

async function getAllUsuarios(){
    const datos = await Usuarios.findAll();
    return datos;
}

module.exports = {Usuarios, getAllUsuarios}