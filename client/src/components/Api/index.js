import axios from "axios";
import Cookies from "js-cookie";

const prod = process.env.REACT_APP_API_URL;

const host = prod;

export default axios.create({
  baseURL: host,
});
