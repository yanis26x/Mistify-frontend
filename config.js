import axios from "axios";

export const api = axios.create({
  baseURL: "", // Vide pour utiliser le domaine courant / proxy Nginx
  withCredentials: true,
});