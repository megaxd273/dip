import $axi from "../http/index";

export default class AuthService{
    static async login(userData){
        return $axi.post("/api/auth/login", userData);
    }
    static async logout(){
        return await $axi.post('/api/auth/logout');
    }
}