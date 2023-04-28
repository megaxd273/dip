const {sq, types} = require('./index');

const User = sq.define('user',{
    login:{
        type: types.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type: types.STRING,
        allowNull:false
    },
    role:{
        type: types.ENUM('ADMIN', 'DEPARTMENT_HEAD', 'METHODIST', 'USER'),
        defaultValue: "USER",
        allowNull: false
    },
    refreshToken:{
        type: types.STRING
    }
});

const Profile = sq.define('profile', {
    firstName: {
      type: types.STRING,
      allowNull: false
    },
    lastName: {
      type: types.STRING,
      allowNull: false
    },
    middleName: {
      type: types.STRING,
      allowNull: false
    },
    academicDegree: {
      type: types.STRING,
      defaultValue: "не указано"
    },
    academicTitle: {
      type: types.STRING,
      defaultValue: "не указано"
    }
  });

User.hasOne(Profile);
Profile.belongsTo(User);


module.exports = { User, Profile};
    
