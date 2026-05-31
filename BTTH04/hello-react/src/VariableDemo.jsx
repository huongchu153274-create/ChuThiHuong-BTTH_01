function VariablesDemo() {
    const studentName = "Chu Thi Huong";
    const university = "Dai hoc Thuy Loi";
    const birthYear = 2004;
    const currentYear = new Date().getFullYear();

    return (
        <div style={{ padding: "20px", border: "2px dashed #e67e22" }}>
            <h2>Ho so sinh vien</h2>
            <p>Ho ten: {studentName}</p>
            <p>Truong: {university}</p>
            <p>Tuoi: {currentYear - birthYear}</p>
        </div>
    );
}

export default VariablesDemo;