import { useState } from "react";

function UserForm() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Tính toán độ dài ký tự
    const nameLength = name.length;

    return (
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", maxWidth: "400px" }}>
            <h3>Đăng ký tài khoản</h3>
            
            {/* Input Tên */}
            <div style={{ marginBottom: "15px" }}>
                <input 
                    type="text" 
                    placeholder="Nhập tên..." 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ padding: "8px", width: "100%" }}
                />
                <p style={{ fontSize: "12px", color: nameLength > 10 ? "red" : "gray" }}>
                    Số ký tự: {nameLength}/10
                </p>
            </div>

            {/* Input Mật khẩu có ẩn/hiện */}
            <div style={{ marginBottom: "15px" }}>
                <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Nhập mật khẩu..." 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: "8px", width: "100%" }}
                />
                <button onClick={() => setShowPassword(!showPassword)} style={{ marginTop: "5px" }}>
                    {showPassword ? "Ẩn" : "Hiện"} mật khẩu
                </button>
            </div>

            {/* Hiển thị thông báo khi hợp lệ */}
            {name && password && (
                <div style={{ marginTop: "20px", padding: "10px", background: "#e8f5e9" }}>
                    <p>Chào <strong>{name}</strong>!</p>
                </div>
            )}
        </div>
    );
}

export default UserForm;