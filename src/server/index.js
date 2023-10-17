import axios from "axios";
import { ENDPOINT, TOKEN } from "../container";
import Cookies from "js-cookie";

export const requies = axios.create({
  baseURL: `${ENDPOINT}api/v1`,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${Cookies.get(TOKEN)}`,
  },
});
