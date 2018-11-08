const role = sessionStorage.getItem('role');
if(!(role === 'admin')){
    window.location.replace('login.html');
}

