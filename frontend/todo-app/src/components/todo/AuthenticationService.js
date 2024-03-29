import axios from "axios";
import { API_URL } from "../../Constant";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
class AuthenticationService{

    executeJwtAuthenticationService(username,password){
        return axios.post(`${API_URL}/authenticate`,
        {username,password})
    }

    executeBasicAuthenticationService(username,password){
        return axios.get(`${API_URL}/basicAuth`,{headers:{authorization : this.createBasicAuthToken(username,password)}})
    }

    createBasicAuthToken(username,password){
        return 'Basic ' + window.btoa(username + ":" + password);
    }

    createJWTToken(token){
        return 'Bearer ' + token;
    }

    registerSuccessfulLogin(username,password){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setAxiosInterceptor(this.createBasicAuthToken(username,password))
    }

    registerSuccessfulLoginForJWT(username,token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setAxiosInterceptor(this.createJWTToken(token))
    }

    logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user == null) return false;
        return true;
    }

    getLoggedInUsername(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user == null) return '';
        return user;
    }

    setAxiosInterceptor(token){
        axios.interceptors.request.use(
            (config)=>{
                if(this.isUserLoggedIn){
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()