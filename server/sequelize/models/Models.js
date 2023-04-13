const {sq, types} = require('./index');

const User = sq.define('user',{
    id:{
        type: types.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
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


module.exports = User;
    
