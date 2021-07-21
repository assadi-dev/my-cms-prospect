import axios from "axios";
import Cookies from "js-cookie";

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
