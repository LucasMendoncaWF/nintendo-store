import SHA256 from 'crypto-js/sha256';

import api from './api';

export function loginPost(userName: string, password: string) {
  return api.post('login', {
    userName,
    password: SHA256(password).toString(),
  });
}
