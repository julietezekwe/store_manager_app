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
document.getElementById('user').innerHTML += sessionStorage.getItem('user');
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
            <img src="img/pro3.jpg" alt="Avatar">
            <div class="product-detail">
                <h3 style="text-align: center"><a href="product-detail.html?id=${product.id}">${product.productname}</a> </h3>
                <p class="text-left"><i class="fas fa-dollar-sign"></i>${product.price}</p> 
                <p class="text">
                    <i class="far fa-edit trigger" onClick ="toggleModalEdit(${product.id})"></i> 
                    <i class="far fa-trash-alt trigger" onClick ="toggleModalDelete(${product.id})"></i>
                </p> 
            </div>
            `       
            document.querySelector("#list").appendChild(newdiv);
        });
    }
});
doFetch(`categories`, 'get', token)
.then(categories => {
    console.log(categories);
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
        document.querySelector("#fillcategory").appendChild(newOption);
    });
   
});
const addProduct = () => {
    console.log('here')
    const productName = document.getElementById('productName').value;
    const description = document.getElementById('description').value;
    const image = 'image.png';
    const quantity = document.getElementById('quantity').value;
    const min = document.getElementById('min').value;
    const price = document.getElementById('price').value;
    const body =JSON.stringify({
        productName,
        description,
        min,
        price,
        quantity,
        image,
    });

    doFetch(`products`, 'post', token, body).then(products => {
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

const editProduct = () => {
    const id = sessionStorage.getItem('modifyId');
    console.log('here')
    const productName = document.getElementById('updateproductName').value;
    const description = document.getElementById('updatedescription').value;
    const image = 'image.png';
    const quantity = document.getElementById('updatequantity').value;
    const min = document.getElementById('updatemin').value;
    const categoryName = document.getElementById('fillcategory').value;
    const price = document.getElementById('updateprice').value;

    let body =JSON.stringify({
        productName,
        description,
        min,
        price,
        quantity,
        image,
    });
    console.log(body)
    doFetch(`products/${id}`, 'put', token, body).then(products => {
        if(products.message){
            sessionStorage.setItem('message', products.message);
          

        };
        if(products.errors){
            sessionStorage.setItem('errors', products.errors);
        }
        if (products.error === true){
            sessionStorage.setItem('error', 'true');
        }
    });
    body = JSON.stringify({
        categoryName,
       });
    doFetch(`products/${id}/category`, 'put', token, body).then(products => {

       console.log(products.message)
       location.reload();
       
    })
}

const deleteProduct = () => {
    const id = sessionStorage.getItem('modifyId');
    doFetch(`products/${id}`, 'delete', token).then(products => {
    
        if (products.error === true){
            sessionStorage.setItem('error', 'true');
        }
          sessionStorage.setItem('message', products.message);
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
                <img src="img/pro3.jpg" alt="Avatar">
                <div class="product-detail">
                    <h3 style="text-align: center"><a href="product-detail.html?id=${product.id}">${product.productname}</a> </h3>
                    <p class="text-left"><i class="fas fa-dollar-sign"></i>${product.price}</p> 
                    <p class="text">
                        <i class="far fa-edit trigger" onClick ="toggleModalEdit(${product.id})"></i> 
                        <i class="far fa-trash-alt trigger" onClick ="toggleModalDelete(${product.id})"></i>
                    </p> 
                </div>
                `       
                document.querySelector("#list").appendChild(newdiv);
            });
        }
    });
}