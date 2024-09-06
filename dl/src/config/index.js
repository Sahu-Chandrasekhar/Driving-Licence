import axios from "axios";
// import config from "../config/index";

const urlType = "local"
// const urlType = "server"
let Api = null;

if (urlType === "server") {
    const apiUrl = "http://192.168.29.162:5555/api/"
    Api = axios.create({ baseURL: apiUrl });
}
else {
    const apiUrl = "http://localhost:5000/api/"
    Api = axios.create({ baseURL: apiUrl });
}
export default Api;