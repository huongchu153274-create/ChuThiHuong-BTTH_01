import { useState } from "react";

function LoginForm() {
    const [formData, setFormData] = useState({ name: "", email: "" });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleReset() {
        setFormData({ name: "", email: "" });
    }

    function handleSubmit(e) {
        e.preventDefault();
        alert(`Chào ${formData.name}, email của bạn là ${formData.email}`);
    }

    return (
        <form onSubmit={handleSubmit} style={{ padding: "20px", border: "1px solid #ccc" }}>
            <h3>Login Form</h3>
            <input 
                name="name" 
                placeholder="Tên..." 
                value={formData.name} 
                onChange={handleChange} 
            />
            <input 
                name="email" 
                type="email" 
                placeholder="Email..." 
                value={formData.email} 
                onChange={handleChange} 
            />
            
            <div style={{ marginTop: "10px" }}>
                <button type="submit">Đăng nhập</button>
                <button type="button" onClick={handleReset} style={{ marginLeft: "10px" }}>
                    Reset
                </button>
            </div>
        </form>
    );
}

export default LoginForm;