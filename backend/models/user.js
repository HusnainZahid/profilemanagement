module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      username:{
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      accessToken: {
        type: DataTypes.TEXT('long'),
      },
      data: {
        type: DataTypes.BLOB("long"),
      },
    });
  
    return User;
  };
  