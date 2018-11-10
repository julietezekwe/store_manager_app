// fetch function
const doFetch = (url, method, token = null, body = null) => (fetch(`https://store-manager-develop.herokuapp.com/api/v1/${url}`, {
  method,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
  body,
}).then(response => response.json()));
