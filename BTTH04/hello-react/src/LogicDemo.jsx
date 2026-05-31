function LogicDemo() {
    const isPassed = true;
    const score = 8.5;
    const hasScholarship = score >= 8.0;

    return (
        <div style={{ padding: "20px", marginTop: "10px", background: "#f0f8ff" }}>
            <h2>Ket qua hoc tap</h2>

            {/* 1. Toan tu 3 ngoi: dieu_kien ? dung : sai */}
            <p>Trang thai: {isPassed ? "Da qua mon" : "Hoc lai"}</p>

            {/* 2. Toan tu &&: hien thi khi dieu kien dung */}
            {hasScholarship && (
                <p style={{ color: "green", fontWeight: "bold" }}>
                    Chuc mung! Ban da dat hoc bong.
                </p>
            )}
        </div>
    );
}

export default LogicDemo;