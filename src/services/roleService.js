import http from "./httpService";
import { apiUrl } from "../config/config.json";

// this only displays the non admin roles (for registration page)
export function getRoles() {
  return http.get(`${apiUrl}/api/role/all`);
}

// this displays all roles (for admin page only)
