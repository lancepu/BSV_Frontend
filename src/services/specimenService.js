import http from "./httpService";
import { apiUrl } from "../config/config.json";

// this only displays the non admin roles (for registration page)
export function getSpecimen() {
  return http.get(`${apiUrl}/api/specimen/all`);
}
