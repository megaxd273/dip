module.exports = class UserDto{
    login;
    id;
    role;

    constructor(user){
        this.login = user.login;
        this.id = user.id;
        this.role = user.role;
    }
}