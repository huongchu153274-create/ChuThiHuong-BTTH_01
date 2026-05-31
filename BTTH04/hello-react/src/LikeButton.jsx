import { useState } from "react";

function LikeButton() {
    const [isLiked, setIsLiked] = useState(false);
    const [count, setCount] = useState(10); // Giả sử ban đầu có 10 lượt like

    function handleLike() {
        if (isLiked) {
            setCount(count - 1);
        } else {
            setCount(count + 1);
        }
        setIsLiked(!isLiked);
    }

    return (
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", width: "200px" }}>
            <h3>Thử thách Like</h3>
            <button 
                onClick={handleLike}
                style={{
                    backgroundColor: isLiked ? "#ff7675" : "#dfe6e9",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px"
                }}
            >
                {isLiked ? "❤️ Đã thích" : "🤍 Thích"}
            </button>
            <p>Số lượt thích: <strong>{count}</strong></p>
        </div>
    );
}

export default LikeButton;