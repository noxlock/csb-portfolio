import decodeJwt from 'jwt-decode';

export function login({ username, password }) {
  return fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password }),
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Login failed');
      } else {
        return res.json();
      }
    })
    .then(json => {
      const token = json.token;
      localStorage.setItem('token', token);
      return token;
    })
    .then(token => {
      const payload = getDecodedToken();
      return payload;
    });
}

export function getToken() {
  return localStorage.getItem('token');
}

export function getDecodedToken() {
  const token = localStorage.getItem('token');
  try {
    return decodeJwt(token);
  } catch {
    return null;
  }
}
