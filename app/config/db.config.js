module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "proto786zoa",
  DB: "social_media",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
