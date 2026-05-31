import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);

    // Logic thay đổi màu sắc dựa trên giá trị count
    const getCountColor = () => {
        if (count > 0) return "green";
        if (count < 0) return "red";
        return "black";
    };

    return (
        <div style={{ textAlign: "center", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
            <h2 style={{ color: getCountColor() }}>Bộ đếm: {count}</h2>
            <p>Trạng thái: {count === 0 ? "Bằng 0" : count > 0 ? "Số dương" : "Số âm"}</p>
            
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <button onClick={() => setCount(count + 5)}>Tăng 5</button>
                <button onClick={() => setCount(count + 1)}>Tăng 1</button>
                
                {/* Nút giảm với điều kiện disabled nếu count <= 0 */}
                <button 
                    onClick={() => setCount(count - 1)}
                    disabled={count <= 0}
                >
                    Giảm 1
                </button>
                
                <button onClick={() => setCount(0)}>Reset</button>
            </div>
        </div>
    );
}

export default Counter;