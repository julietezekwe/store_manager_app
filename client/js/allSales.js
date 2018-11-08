const months = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", " Dec"];
const days = [ "Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const token = sessionStorage.getItem('token');
doFetch(`sales`, 'get', token)
.then(sales => {
    if(sales.SalesModel){
        let quantitySold = 0;
        let totalPrice = 0;
        let count = 0;
        let salesCount = sales.SalesModel.length;
        console.log(sales.SalesModel);
        sales.SalesModel.forEach(sale => {
            quantitySold += sale.quantity;
            totalPrice += sale.price;
            count += 1;
            let newrow = document.createElement('tr');
            newrow.innerHTML =
            `
                      <td>${sale.productid}</td>
                      <td>${sale.productname}</td>
                      <td>${sale.quantity}</td>
                      <td>${sale.price}</td>
                      <td>${sale.name}</td>
                      <td>
                      <span> ${new Date(sale.created_at).getDate()} / ${new Date(sale.created_at).getMonth()} / ${new Date(sale.created_at).getFullYear()}</span>
                      </td>
                         
            `  ;     
            document.querySelector("#allSales").appendChild(newrow);
            if ( count === salesCount){
                let tfoot = document.createElement('tfoot');
                tfoot.innerHTML = `
                <tr>
                    <td></td>
                    <th style="text-align: center; font-weight: bold">Total</th>
                    <td>${quantitySold}</td>
                    <td>${totalPrice}</td>
                </tr>
                `;
                document.querySelector("#allSales").appendChild(tfoot);
            }
        });

    }
});