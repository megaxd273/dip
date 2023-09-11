import {makeAutoObservable} from "mobx"
import AuthService from "../service/AuthService";
import axios from "axios";
import DepHeadService from "../service/DepHeadService";

export default class Store{
    user = {};
    isAuth = false;
    isLoading = false;
    faculty = 0;
    constructor(){
        makeAutoObservable(this)
    }

    setAuth(bool){
        this.isAuth = bool;
    }
    setUser(user){
        this.user = user;
    }
    setLoading(bool){
        this.isLoading = bool;
    }
    setFaculty(number){
        this.faculty=number
    }
    async getFaculty(){
        try {
            const response = await DepHeadService.getProfile(this.user.id)
            this.setFaculty(response.data.facultyId)
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }

    async login(userData){
        try {
            const response = await AuthService.login(userData);
            console.log(response)
            localStorage.setItem('accessToken',response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (error) {
            alert(error.response?.data?.message)
        }
    }
    async logout(){
        try {
            await AuthService.logout();
            localStorage.removeItem('accessToken')
            this.setAuth(false)
            this.setUser({})
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
    async checkAuth(){
        this.setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/auth/refresh", {withCredentials:true})
            console.log(response)
            localStorage.setItem('accessToken',response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (error) {
            alert(error.response?.data?.message)
        } finally{
            this.setLoading(false);
        }
    }
}