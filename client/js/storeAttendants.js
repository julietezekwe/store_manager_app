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
const months = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", " Dec"];
const days = [ "Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
document.getElementById('user').innerHTML += sessionStorage.getItem('user');
let carts = localStorage.getItem('cart');

if(carts.length > 0) {
    carts = carts.split(',');
let uniqueCart = [];
carts.map(cart => {
    if (uniqueCart.indexOf(cart) === -1 && Number(cart)) uniqueCart.push(cart);
});
if(uniqueCart.length > 0) {
    document.getElementById('shoppingCart').innerHTML += `(${uniqueCart.length})`;
}

}
  const token = sessionStorage.getItem('token');
  let category = 'All';
  doFetch(`${category}/products`, 'get', token)
  .then(products => {
      let ProductsModel;
      if(products.ProductsModel){
          products.ProductsModel.forEach(product => {
              let newdiv = document.createElement('div');
              newdiv.className = 'card col-3 removewhilesearch';
              newdiv.innerHTML =
              ` 
              <div class="ribbon ribbon-top-left"><span> &nbsp; &nbsp; In Stock (${product.quantity})</span></div>
              <img src="img/pro1.jpg" alt="Avatar">
              <div class="product-detail">
                  <h3 style="text-align: center"><a href="product-detail.html?id=${product.id}">${product.productname}</a> </h3>
                  <p class="text-left">&#8358;${product.price}</p> 
                   <p class="text"><a href="#" class="trigger-edit" onClick="toggleModalEdit(${product.id})">
                           <i class="far fa-edit" ></i></a><a href="#"> &nbsp; &nbsp; 
                           <i class="fas fa-shopping-cart trigger" onClick="addToCart(${product.id})"></i></i>
                       </a>
                   </p> 
           </div>
              `       
              document.querySelector("#list").appendChild(newdiv);
          });
      }
  });

doFetch(`categories`, 'get', token)
.then(categories => {
    categories.CategoriesModel.map(category => {
        let newOption = document.createElement('option');
        newOption.value = category.categoryname;
        newOption.innerHTML = category.categoryname;
        document.querySelector("#category").appendChild(newOption);
    });
    categories.CategoriesModel.map(category => {
        let newOption = document.createElement('option');
        newOption.value = category.categoryname;
        newOption.innerHTML = category.categoryname;
        // document.querySelector("#category").appendChild(newOption);
        document.querySelector("#fillcategory").appendChild(newOption);
    });
});

const editCategory = () => {
    
    const id = sessionStorage.getItem('modifyId');
    const categoryName = document.getElementById('fillcategory').value;

    body = JSON.stringify({
        categoryName,
       });
    doFetch(`products/${id}/category`, 'put', token, body).then(products => {

        if(products.message){
            sessionStorage.setItem('message', products.message);
          
    
        };
        if(products.errors){
            sessionStorage.setItem('errors', products.errors);
        }
        if (products.error === true){
            sessionStorage.setItem('error', 'true');
        }
       location.reload();
       
    })
}

const searchProduct = () => {
    const removeElements = (elms) => [...elms].forEach(el => el.remove());
    removeElements( document.querySelectorAll(".removewhilesearch") );
    let category = document.getElementById('category').value;
    doFetch(`${category}/products`, 'get', token)
    .then(products => {
        let ProductsModel;
        if(products.ProductsModel){
            products.ProductsModel.forEach(product => {
                let newdiv = document.createElement('div');
                newdiv.className = 'card col-3 removewhilesearch';
                newdiv.innerHTML =
                ` 
                <div class="ribbon ribbon-top-left"><span> &nbsp; &nbsp; In Stock (${product.quantity})</span></div>
                <img src="img/pro1.jpg" alt="Avatar">
                <div class="product-detail">
                    <h3 style="text-align: center"><a href="product-detail.html?id=${product.id}">${product.productname}</a> </h3>
                    <p class="text-left">&#8358;${product.price}</p> 
                     <p class="text"><a href="#" class="trigger-edit" onClick="toggleModalEdit(${product.id})">
                             <i class="far fa-edit" ></i></a><a href="#"> &nbsp; &nbsp; 
                             <i class="fas fa-shopping-cart trigger" onClick="addToCart(${product.id})"></i></i>
                         </a>
                     </p> 
             </div>
                `     
                document.querySelector("#list").appendChild(newdiv);
            });
        }
    });
  
}