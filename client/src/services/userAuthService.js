import axios from "axios"

class UserAuthService{

    constructor(){
        this.api=String(import.meta.env.VITE_APP_BACKEND);
    }

    async userRegistration(data){
        try {
            const response=await axios.post(`${this.api}/user/user-registration`,data,{})
            console.log(response.data.user);

            return response.data.user;
        } catch (error){
            console.error(error);
            throw error;
        }
    }

    async userLogin(data){
        try {
            const response=await axios.post(`${this.api}/user/user-registration`,data,{})
            console.log(response.data.user);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}


export default new UserAuthService()