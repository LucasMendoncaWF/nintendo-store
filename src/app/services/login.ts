import api from "./api";
import SHA256 from 'crypto-js/sha256';

export function loginPost(userName: string, password: string) {
  return api.post("login", {
    userName, password: SHA256(password).toString()
  })
}