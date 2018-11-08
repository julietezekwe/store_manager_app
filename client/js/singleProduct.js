const token = sessionStorage.getItem('token');
const urlParams = new URLSearchParams(location.search);
const id = Number(urlParams.get('id'));  
console.log(id)
doFetch(`products/${id}`, 'get', token)
.then(product => {
    const { productDetail } = product;
    console.log(productDetail)
    document.getElementById('stock').innerHTML = productDetail[0].quantity;
    document.getElementById('price').innerHTML = productDetail[0].price;
    document.getElementById('name').innerHTML = productDetail[0].productname;
    document.getElementById('category').innerHTML = productDetail[0].category;
    document.getElementById('description').innerHTML = productDetail[0].description;
    document.getElementById('minimum').innerHTML = productDetail[0].min;
    document.getElementById('created').innerHTML = new Date(productDetail[0].created_at).getDate() + ' / ';
    document.getElementById('created').innerHTML += new Date(productDetail[0].created_at).getMonth()  + ' / ';
    document.getElementById('created').innerHTML += new Date(productDetail[0].created_at).getFullYear();
});