import axios from "axios";
import Cookies from "js-cookie";

export default axios.create({
  baseURL: "https://memo-prospection-api.herokuapp.com/api",
});
