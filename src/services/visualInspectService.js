import http from "./httpService";
import { apiUrl } from "../config/config.json";

// this only displays the non admin roles (for registration page)
export function getVisualInspect() {
  return http.get(`${apiUrl}/api/visualinspect/all`);
}
