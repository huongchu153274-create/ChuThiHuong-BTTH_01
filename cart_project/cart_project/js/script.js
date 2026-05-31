// Demo Data for Products
const products = [
    { id: 1, name: 'Product 1', price: 29.99, image: 'https://salt.tikicdn.com/cache/750x750/ts/product/b2/02/d8/216624ab5e54d0f15d4ac3bfb6e968a7.jpg.webp' },
    { id: 2, name: 'Product 2', price: 19.99, image: 'https://salt.tikicdn.com/cache/750x750/media/catalog/producttmp/b5/c5/f6/2a1a5ff9cc325dcdc0650a098a1753aa.jpg.webp' },
    { id: 3, name: 'Product 3', price: 39.99, image: 'https://salt.tikicdn.com/cache/750x750/media/catalog/producttmp/b5/c5/f6/2a1a5ff9cc325dcdc0650a098a1753aa.jpg.webp' },
    { id: 4, name: 'Product 4', price: 49.99, image: 'https://salt.tikicdn.com/cache/750x750/media/catalog/producttmp/b5/c5/f6/2a1a5ff9cc325dcdc0650a098a1753aa.jpg.webp' },
    { id: 5, name: 'Product 5', price: 69.99, image: 'https://salt.tikicdn.com/cache/750x750/media/catalog/producttmp/b5/c5/f6/2a1a5ff9cc325dcdc0650a098a1753aa.jpg.webp' },
];

// Duyệt mảng
products.forEach(product => {
    document.querySelector('#products .row').innerHTML += `<div class="col-md-4">
                <div class="card" style="width: 18rem;">
                    <img src="${product.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.price.toFixed(2)} VND</p>
                        <a href="#" class="btn btn-primary">Mua</a>
                    </div>
                </div>
    </div>`;
});

let btnBuys = document.querySelectorAll("#products .row a");
btnBuys.forEach((btnBuy) => {
    btnBuy.addEventListener('click', () => {
        //Get name and price
        let name = this.parentElement.querySelector(".card-title").textContent;
        let price = this.parentElement.querySelector(".card-text").textContent;
        //Create new row
        let newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${name}</td><td>${price}</td><td>1</td>`;
        //Add to card table
        document.querySelector("#carts tbody").appendChild(newRow);
    });
});

async function getProducts(){
    try {
        const products = await fetch('https://65983b0d12a8a764087ab1f0.mockapi.io/api/v1/products');
        const productData = await products.json();
        return productData;
    } catch (error) {
        console.error(error);
    }
};
getProducts();
