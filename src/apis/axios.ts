import axios from "axios";

export const api = axios.create({
  baseURL: "https://yeobi.scg.skku.ac.kr",
  headers: {
    "Content-Type": "application/json",
  },
});
