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
let carts = localStorage.getItem('cart');

carts = carts.split(',');
let uniqueCart = [];
carts.map(cart => {
    if (uniqueCart.indexOf(cart) === -1 && Number(cart)) uniqueCart.push(cart);
});
const token = sessionStorage.getItem('token');
if(uniqueCart.length > 0){
    let serial = 1;
    let count = 0;
    let productCount = uniqueCart.length;
    let totalPrice = 0;
    uniqueCart.map(id => {
        doFetch(`products/${Number(id)}`, 'get', token)
        .then(productSale => {
           
            const { productDetail } = productSale;
            totalPrice += Number(productDetail[0].price);
           
            count += 1;
            let newrow = document.createElement('tr');
            newrow.innerHTML =
            `
                      <td>${serial}</td>
                      <td>${productDetail[0].productname}</td>
                      <td>${productDetail[0].description}</td>
                      <td>${productDetail[0].id}</td>
                      <td><input type="number" name="" id="quantity${id}" onchange="priceChange(${id})" value="1" style="text-align: center; width: 50px;"></td>
                      <td id ="oldprice${id}" value="${productDetail[0].price}">${productDetail[0].price}</td>  
                      <i class="far fa-trash-alt trigger"  onclick ="removeProduct(${productDetail[0].id})"></i>                     
            `  ;    
            serial += 1; 
            document.querySelector("#check").appendChild(newrow);
            if (count === productCount){
                document.getElementById('checkoutPrice').innerHTML = totalPrice;
            }
        });
        
    });
}

const priceChange = (id) => {
    let quantity = document.getElementById(`quantity${id}`).value;
    let oldprice = document.getElementById(`oldprice${id}`).innerHTML;
    let pricenow = Number(quantity) * Number(oldprice);
    let oldTotal =  document.getElementById('checkoutPrice').innerHTML;
    let newTotal = Number(oldTotal) + Number(pricenow);

    // document.getElementById('checkoutPrice').innerHTML = newTotal;

  }

const removeProduct = (id) =>{
   
    for( let i = 0; i < uniqueCart.length; i++){ 
        if ( Number(uniqueCart[i]) === Number(id)) {
            uniqueCart.splice(i, 1); 
            console.log(id)
        }
     }
    
     localStorage.setItem('cart', uniqueCart.join(','));
     location.reload();
}
const checkout = () => {
const rows = document.getElementById('check').rows;
const sales = [];
for(let i = 1; i < rows.length-2; i++){
    let id = rows[i].cells[3].innerHTML;
    let sale = {
       productId: rows[i].cells[3].innerHTML,
       productName: rows[i].cells[1].innerHTML,
       quantity: document.getElementById(`quantity${id}`).value,
    };
    sales.push(sale);
    
}
const body =JSON.stringify({
     sales,
});
console.log(body)
doFetch(`sales`, 'post', token, body).then(salesDetail => {
    if(salesDetail.message){
        sessionStorage.setItem('message', salesDetail.message);
      

    };
    if(salesDetail.errors){
        sessionStorage.setItem('errors', salesDetail.errors);
    }
    if (salesDetail.error === true){
        sessionStorage.setItem('error', 'true');
    }
    localStorage.setItem('cart', "");
    location.reload();
   
})
}


console.log(uniqueCart);