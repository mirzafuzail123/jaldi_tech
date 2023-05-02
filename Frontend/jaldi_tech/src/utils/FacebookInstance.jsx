import axios from "axios";

const FacebookInstance = axios.create({
    baseURL: "https://graph.facebook.com/v16.0",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
    }
})
export default FacebookInstance;