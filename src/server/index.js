import axios from "axios";
import { ENDPOINT } from "../container";

export const requies = axios.create({
  baseURL: ENDPOINT,
  timeout: 10000,
});
