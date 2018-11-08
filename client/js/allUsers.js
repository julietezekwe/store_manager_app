const months = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", " Dec"];
const days = [ "Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const token = sessionStorage.getItem('token');
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
doFetch(`users`, 'get', token)
.then(users => {

    let UsersModel;
    if(users.UsersModel){
        console.log(users.UsersModel);
        users.UsersModel.forEach(user => {
            let newrow = document.createElement('tr');
            newrow.innerHTML =
            `
                      <td>${user.id}</td>
                      <td>${user.name}</td>
                      <td>${user.username}</td>
                      <td>${user.email}</td>
                      <td>${user.role}</td>
                      <td>
                      <span> ${new Date(user.joined).getDate()} / ${new Date(user.joined).getMonth()} / ${new Date(user.joined).getFullYear()}</span>
                      </td>
                      <td>
                          <i class="far fa-edit " onclick="toggleModalEdit(${user.id})"></i> &nbsp; 
                         <i class="far fa-trash-alt trigger" onclick="toggleModalDelete(${user.id})"></i>
                      </td>
                         
            `       
            document.querySelector("#allUsers").appendChild(newrow);
        });
    }
});


const addUser = () => {
    console.log('here')
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const body =JSON.stringify({
        name,
        email,
        username,
        password,
        role,
    });
console.log(body)
    doFetch(`auth/createUser`, 'post', token, body).then(users => {
        if(users.message){
            sessionStorage.setItem('message', users.message);

        };
        if(users.errors){
            sessionStorage.setItem('errors', users.errors);
        }
        if (users.error === true){
            sessionStorage.setItem('error', 'true');
        }
        location.reload();
    })
}

const editUser = () => {
    console.log('here')
    const id = sessionStorage.getItem('modifyId');
    const name = document.getElementById('updatename').value;
    const email = document.getElementById('updateemail').value;
    const username = document.getElementById('updateusername').value;
    const password = document.getElementById('updatepassword').value;
    const role = document.getElementById('updaterole').value;
    const body =JSON.stringify({
        name,
        email,
        username,
        password,
        role,
    });
console.log(body)
    doFetch(`users/${id}`, 'put', token, body).then(users => {
        if(users.message){
            sessionStorage.setItem('message', users.message);

        };
        if(users.errors){
            sessionStorage.setItem('errors', users.errors);
        }
        if (users.error === true){
            sessionStorage.setItem('error', 'true');
        }
        location.reload();
    })
}
const deleteUser = () => {
    const id = sessionStorage.getItem('modifyId');
    doFetch(`users/${id}`, 'delete', token).then(users => {
         
        if (users.error === true){
            sessionStorage.setItem('error', 'true');
        }
          sessionStorage.setItem('message', users.message);
        location.reload();
    })
}