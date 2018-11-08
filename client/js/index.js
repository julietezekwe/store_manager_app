const months = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", " Dec"];
const days = [ "Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  const token = sessionStorage.getItem('token');
  doFetch(`products`, 'get', token)
  .then(products => {
      let ProductsModel;
      if(products.ProductsModel){
          products.ProductsModel.forEach(product => {
              let newdiv = document.createElement('div');
              newdiv.className = 'container';
              newdiv.innerHTML =
              ` 
              <div class="">
              <div class="card col-3">
                  <div class="ribbon ribbon-top-left"><span> &nbsp; &nbsp; In Stock (${product.quantity})</span></div>
                  <img src="img/pro1.jpg" alt="Avatar">
                  <div class="product-detail">
                      <h3 style="text-align: center"><a href="product-detail.html?id=${product.id}">${product.productname}</a> </h3>
                      <p class="text-left"><i class="fas fa-dollar-sign"></i>${product.price}</p> 
                      <p class="text trigger link" onclick="toggleModal(${product.id})">Add to cart</p> 
                  </div>
              </div>
          </div>             
              `       
              document.querySelector("#page").appendChild(newdiv);
          });
      }
  });