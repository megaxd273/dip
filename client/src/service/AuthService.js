import $axi from "../http/axi";

export default class AuthService{
    static async login(login, password){
        return $axi.post("/api/login",{login, password})
    }
    static async register(login, password, ){
        return $axi.post("/api/login",{login, password})
    }
    static async logout(){
        return $axi.post("/api/logout")
    }
}