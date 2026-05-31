function UserCard({ name, email, avatar }) {
    return (
        <div style={{
            border: "1px solid #ddd",
            padding: "15px",
            margin: "10px 0",
            display: "flex",
            alignItems: "center",
            gap: "15px",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9"
        }}>
            <img 
                src={avatar} 
                alt="Avatar" 
                style={{ width: "60px", height: "60px", borderRadius: "50%" }} 
            />
            <div>
                <h3 style={{ margin: "0 0 5px 0" }}>{name}</h3>
                <p style={{ margin: 0, color: "gray" }}>{email}</p>
            </div>
        </div>
    );
}

export default UserCard;