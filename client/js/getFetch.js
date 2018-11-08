// fetch function
const doFetch = (url, method, token = null, body = null) => (fetch(`http://localhost:8000/api/v1/${url}`, {
  method,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
  body,
}).then(response => response.json()));
