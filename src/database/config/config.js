
require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "bugbxwg5e6enjshragy4",  //--> Este nombre debe ser igual a cómo lo tiene configurado cada uno en su compu
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "bugbxwg5e6enjshragy4",
    "host": "bugbxwg5e6enjshragy4-mysql.services.clever-cloud.com",
    "dialect": 'mysql'
  }
}
