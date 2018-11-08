const months = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", " Dec"];
const days = [ "Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const token = sessionStorage.getItem('token');
document.getElementById('user').innerHTML += sessionStorage.getItem('user');
doFetch(`user/sales`, 'get', token)
.then(sales => {
    console.log(sales)
    if(sales.saleDetail){
        let quantitySold = 0;
        let totalPrice = 0;
        let count = 0;
        let salesCount = sales.saleDetail.length;
        let salePrice;
        let totalSales = [];
        console.log(sales.saleDetail);
        sales.saleDetail.forEach(sale => {
            quantitySold += sale.quantity;
            salePrice = sale.price * sale.quantity;
            totalPrice += salePrice;
            count += 1;
            if (totalSales.indexOf(sale.salesid) === -1) totalSales.push(sale.salesid);
            let newrow = document.createElement('tr');
            newrow.innerHTML =
            `
                      <td>${sale.productid}</td>
                      <td>${sale.salesid}</td>
                      <td>${sale.productname}</td>
                      <td>${sale.quantity}</td>
                      <td>${sale.price}</td>
                      <td>${salePrice}</td>
                      <td>
                      <span> ${new Date(sale.created_at).getDate()} / ${new Date(sale.created_at).getMonth()} / ${new Date(sale.created_at).getFullYear()}</span>
                      </td>

                         
            `  ;     
            document.querySelector("#mySales").appendChild(newrow);
            if ( count === salesCount){
                let tfoot = document.createElement('tfoot');
                document.getElementById('totalProducts').innerHTML += quantitySold;
                document.getElementById('totalPrice').innerHTML += totalPrice;
                document.getElementById('totalSales').innerHTML += totalSales.length;
                tfoot.innerHTML = `
                <tr>
                    <td colspan="2"></td>
                    <th style="text-align: center; font-weight: bold">Total</th>
                    <td>${quantitySold}</td>
                    <td>${totalPrice}</td>
                </tr>
                `;
                document.querySelector("#mySales").appendChild(tfoot);
            }
        });

    }
});