import axios from "axios";

// Thiết lập trình kết nối api 
const instance = axios.create({
    baseURL: "http://localhost:3003/",
    headers: {
        "Content-Type": "application/json",
    },
});
export default instance;