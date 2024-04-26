'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development'; /* 'development', 'production' */  // Define el entorno
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;

// Si se está ejecutando en el entorno de producción y hay una URL de base de datos, utilizarla
if (process.env.DATABASE_URL && env === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, config);
} else {
  // De lo contrario, utilizar la configuración del archivo config.js
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Confirms the connection to the database
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database!');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
})();

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
