const role = sessionStorage.getItem('role');
if(!(role === 'attendant')){
    window.location.replace('login.html');
}
