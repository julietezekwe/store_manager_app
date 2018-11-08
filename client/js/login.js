if(sessionStorage.getItem('message')){
    
  const message = sessionStorage.getItem('message');
  const alert = document.getElementById('alert');
  if(sessionStorage.getItem('error') || message === "An error occured"){
      alert.style.background = '#F8D7DA';
      sessionStorage.removeItem('error')
  }
  alert.style.display = 'block';
  alert.innerHTML = message;
  sessionStorage.removeItem('message');
  
}
if(sessionStorage.getItem('errors')){
  const messages = sessionStorage.getItem('errors').split(',');
  console.log(messages)
  const alerts = document.getElementById('alert');
      alerts.style.background = '#F8D7DA';
      alerts.style.display = 'block';
      
      messages.forEach(message => {
  
  alerts.innerHTML += `<li> ${message} </li>`;
})
sessionStorage.removeItem('error')
  sessionStorage.removeItem('errors');
}
const userLogin = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const body = JSON.stringify({
    password,
    email,
  });
  console.log(body);
  doFetch('auth/login', 'post', null, body)
    .then((data) => {
      if(data.message){
        sessionStorage.setItem('message', data.message);
    };
    if(data.errors){
        sessionStorage.setItem('errors', data.errors);
    }
    if (data.error === true){
        sessionStorage.setItem('error', 'true');
        location.reload();
    }
      const token = data.token;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('role', data.authDetail.role);
      sessionStorage.setItem('user', data.authDetail.username);
      localStorage.setItem('cart', "");
      if (data.authDetail.role === 'admin') window.location.replace('admin.html');
      else window.location.replace('store-attendant.html');
    });
};

const logout = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('role');
  localStorage.removeItem('cart');
  sessionStorage.removeItem('user');
};
