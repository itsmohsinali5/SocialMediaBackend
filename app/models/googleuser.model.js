module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("googleusers", {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      picture: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };
  