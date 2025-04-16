import axios from 'axios';

interface SessionToken {
  data: SessionTokenData;
}

interface SessionTokenData {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export async function getAuth(): Promise<SessionToken> {
  return await axios.post('https://id.twitch.tv/oauth2/token', {
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
    grant_type: 'client_credentials',
  });
}

export function getToken() {
  const token = sessionStorage.getItem('userToken');
  if (!token || (token && !JSON.parse(token).access_token)) {
    return null;
  }
  return JSON.parse(token) as SessionTokenData;
}
