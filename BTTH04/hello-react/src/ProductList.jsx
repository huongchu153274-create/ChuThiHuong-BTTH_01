function ProductList() {
    const products = [
        { id: 1, name: "Ban phim co", price: 1200000 },
        { id: 2, name: "Chuot khong day", price: 500000 },
        { id: 3, name: "Man hinh", price: 3500000 },
        { id: 4, name: "Lot chuot", price: 100000 },
        { id: 5, name: "Tai nghe", price: 1500000 },
        { id: 6, name: "Loa Bluetooth", price: 800000 }
    ];

    // Tinh tong tien dung reduce
    const totalPrice = products.reduce((total, item) => total + item.price, 0);

    return (
        <div style={{ padding: "20px", border: "2px solid #2ecc71", borderRadius: "8px", marginBottom: "20px" }}>
            <h2>Danh sach San pham</h2>
            <ul>
                {products.map(product => (
                    <li 
                        key={product.id} 
                        // Toan tu 3 ngoi de check gia > 1 trieu
                        style={{ color: product.price > 1000000 ? "red" : "black", fontWeight: "bold" }}
                    >
                        {product.name} - {product.price.toLocaleString()} VND
                    </li>
                ))}
            </ul>
            
            <h3 style={{ color: "#2980b9" }}>Tong tien: {totalPrice.toLocaleString()} VND</h3>
        </div>
    );
}

export default ProductList;