PHẦN A
Câu A1 -HTTP & Browser
1, Khi bạn nhập https://shopee.vn vào trình duyệt và nhấn Enter, các bước xảy ra theo đúng thứ tự như sau:
1.1: DNS Lookup 
Trình duyệt gửi yêu cầu phân giải tên miền shopee.vn -> DNS server trả về địa chỉ IP của server
1.2: Thiết lập kết nối TCP(TCP Handshake) 
Trình duyệt thiết lập kết nối với server qua 3 bước : SYN -> SYN-ACK ->ACK
1.3: Thiết lập bảo mật TLS (HTTPS)
Vì dùng HTTPS nên trình duyệt và server thực hiện bắt tay TLS để mã hóa dữ liệu
1.4: Gửi HTTP Request
Trình duyệt gửi request(thường là GET /) tới server để yêu cầu tài nguyên
1.5: Server xử lý và trả về HTTP Response
Server tìm file(thường là index.html) và trả về response(ví dụ: 200 OK) kèm HTML
1.6: Brower parse HTML
Trình duyệt đọc HTML và xây dựng DOM Tree
1.7: Tải thêm tài nguyên (CSS, JS, images)
Trình duyệt tiếp tụ gửi request để lấy các file CSS, JS
1.8: Render giao diện
Thực hiện pipeline:
1.8.1: Parse HTML -> DOM
1.8.2: Parse CSS -> CSSOM
1.8.3: Execute JS
1.8.4: Layout -> Paint -> Composite
=> Cuối cùng hiển thị trang web hoàn chỉnh.
Nguồn tham chiếu: phần Big Picture- Web hoạt động như thế nào? (Client-Server Architecture) và Brower Rendering Pipeline- Cách brower biến HTML thành giao diện.

2, Tab Network trong Chrom DevTools
Tab Network cho thấy gì? 
Tab Network tỏng Chrom DevTools hiển thị toàn bộ quá trình giao tiếp giữa trình duyệt và server:
2.1: Danh sách các request (HTML, CSS, JS, images ...)
2.2: HTTP Method (GET, POST ...)
2.3: Status Code (200, 404, 500 ...)
2.4: Thời gian tải (Timing)
2.5: Kích thước dữ liệu 
2.6: Headers(Request & Response)
2.7: Waterfall(timeline tải tài nguyên)
![Shopee Network](shopee.png)
Nguồn tham chiếu: phần HTTP-Giao thức giao tiếp và phần Hands-on Practice-Inspect một trang web thật


Câu A2: Semantic HTML-Phân tích lỗi SEO
Trang web bị Google đánh giá SEO thấp vì: Trang web sử dụng quá nhiều thẻ <div> thay vì các thẻ semantic HTML (có ý nghĩa).
Điều đó khiến:
- Công cụ tìm kiếm Google khó hiểu cấu trúc trang
- Giảm khả năng SEO (Seach Engine Optimization)
- Kém accessibility (trình đọc màn hình khó hiểu)
Các lỗi 
1, Lỗi vì dùng <div> thay vì thẻ semantic
<div class="header">
sửa: <header>
2, Lỗi vì dùng menu không dùng <nav>
<div class="menu">
    <div><a href="/">Trang chủ</a></div>
    <div><a href="/products">Sản phẩm</a></div>
</div>
sửa: 
<nav>
    <a href="/">Trang chủ</a>
    <a href="/products">Sản phẩm</a>
</nav>
3, Lỗi nội dung chính không dùng <main>
<div class="main">
sửa: <main>
4, Lỗi sản phẩm không dùng <article>
<div class="product">
sửa: <article class="product">
5, Lỗi tiêu đề không dùng thẻ heading
<div class="title">iphone 16 Pro</div>
sửa: <h1>iphone 16 Pro</h1>
Nguồn tham chiếu: Phần why this Matters- Tại sao cần học bài này? và phần Core Technical Truth- Semantic Elements chi tiết, Div Soup vs Semantic HTML


Câu A3: Block với Inline 
kết quả hiển thị (mô tả bằng text)

Hộp 1
Text A Text B
Hộp 2
Text C Text D
Hộp 3

Giải thích
<div> là block element
    Luôn chiếm 1 dòng riêng
    Tự động xuống dòng trước và sau
<span> vả <strong> là inline element
    Hiển thị trên cùng 1 dòng
    Không tự xuống dòng
Nguồn tham chiếu: phần Block với inline- Nhác lại với ngữ cảnh thực tế


Câu A4: Table
Sự khác nhau giữa <thead>, <tbody>, <tfoot>
<thead>
    Là phần tiêu đề của bảng
    Chứa các <th> (table header)
    Giúp:
        Brower hiểu đâu là header
        Screen reader đọc đúng ngữ nghĩa
<tbody>
    Là phần dữ liệu chính của bảng
    Chứa các dòng <tr> với <td>
    Đây là phần nội dung chính mà user nhìn thấy
<tfoot>
Là phần tổng kết của bảng
Thường dùng để :
    Tổng số
    Kết luận
Có thể được browser render trước cả <tbody> (tối ưu hiển thị)

Không dùng Table để Layout vì 
1, Sai mục đích Semantic
<table> chỉ dành cho tabular data (dữ liệu dạng bảng)
Dùng để layout làm :
    Google hiểu sai cấu trúc
    SEO kém
2, Khó maintain (code rối)
Phải lồng nhiều 
<table><tr><td>...</td></tr></table>
Khó đọc khó sửa hơn so với
<div> + CSS
Flexbox/Grid
3, Không responsive
Table không linh hoạt với mobile 
Khó co giãn theo màn hình 
Không phù hợp với thiết kế hiện đại
4, Trải nghiệm kém với accessibility
Screen reader sẽ đọc như bảng dữ liệu 
Nếu dùng để layout -> gây hiểu sai nội dung 
Nguồn tham chiếu: Phần:
Core Technical Truth — <table> — Cấu trúc đầy đủ
Bảng giải thích từng thẻ
Simplified Layer — Table chỉ cho dữ liệu tabular
Common Misconceptions — "Dùng <table> để layout"


PHẦN C:
Câu C1: Thiết kế cấu trúc HTML trang sản phẩm 
<!-- Header: phần đầu trang -->
<header>
    <!-- nav vì đây là khu vực điều hướng chính -->
    <nav aria-label="Menu chính">
        <ul> <!-- ul vì đây là danh sách menu-->
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
        </ul>
    </nav>
</header>
<!-- Breadcrumb -->
<nav aria-label="breadcrumb"> <!-- nav vì đây là điều hướng -->
    <ol> <!-- ol vì breadcrumb có thứ tự -->
        <li><a href="/">Trang chủ</a></li>
        <li>iphone 16</li>
    </ol>
</nav>
<!-- Nội dung chính của trang -->
<main> <!-- main vì đây là nội dung chính, chỉ có 1 per page -->
    <!-- Trang chi tiết sản phẩm -->
    <article class="product-page"> <!-- article vì nội dung độc lập -->
        <!-- Khu vực ảnh -->
        <section class="product-page"> <!-- section vì nhóm nội dung liên quan -->
            <h2>Hình ảnh sản phẩm</h2>
            <!-- figure vì ảnh có thể có caption -->
            <figure>
                <img src="img1.ipg" alt="Ảnh 1 sản phẩm">
            </figure>
            <figure>
                <img src="img2.ipg" alt="Ảnh 2 sản phẩm">
            </figure>
            <figure>
                <img src="img3.ipg" alt="Ảnh 3 sản phẩm">
            </figure>
            <figure>
                <img src="img4.ipg" alt="Ảnh 4 sản phẩm">
            </figure>
            <figure>
                <img src="img5.ipg" alt="Ảnh 5 sản phẩm">
            </figure>
        </section>
        <!-- Thông tin sản phẩm -->
        <section class="product-info"> <!-- section vì nhóm thông tin>
            <h1>Tên sản phẩm</h1> <!--  h1 vì tiêu đề chính -->
            <p class="price"> <!-- p vì là đoạn text -->
                <del>Giá cũ</del> <!-- del cho giá cũ -->
                <ins><strong>Giá mới</strong></ins> <!-- ins + strong để nhấn mạnh -->
            </p>
            <p class="rating">★★★★★</p> <!-- hiển thị đánh giá -->
            <p class="description">Mô tả sản phẩm</p>
        </section>
        <!-- Bảng thông số kỹ thuật -->
        <section class="product-specs"> <!-- section vì nhóm dữ liệu >
            <h2>Thông số kỹ thuật</h2>
            <table> <!-- table vì dữ liệu dạng bảng -->
                <thead>
                    <tr>
                        <th>Thuộc tính</th>
                        <th>Giá trị</th>
                    </tr>
                </tread>
                <tbody>
                    <tr>
                        <td>CPU</td>
                        <td>...</td>
                    </tr>
                    <tr>
                </tbody>
            </table>
        </section>
        <!-- Đánh giá / bình luận -->
        <article class="review">
            <blockquote> <!-- blockquote cho trích dẫn -->
                "Sản phẩm rất tốt"
                <cite>- Người dùng A</cite>
            </blockquote>
        </article>
        <article class="review">
            <blockquote>
                "Đáng tiền"
                <cite>- Người dùng B</cite>
            </blockquote>
        </article>
    </section>
</article>
<!-- Sidebar -->
<aside class="related-products"> <!-- aside vì nội dung phụ -->
    <h2>Sản phẩm tương tự</h2>
    <ul>
        <li><a href="#">Sản phẩm 1</a></li>
        <li><a href="#">Sản phẩm 2</a></li>
    </ul>
</aside>
</main>
<!-- Footer -->
<footer> <!-- footer vì phần cuối trang -->
    <p>@ 2026 ShopTLU</p>
</footer>
Nguồn tham chiếu: 
Phần: Big Picture — Bản đồ <body>
Phần: Bản đồ Semantic Elements
Phần: Core Technical Truth — <table>

Câu C2: So sánh & Tranh luận 
Quan điểm "chỉ dùng <div> cho mọi thứ" là thiếu chính xác về mặt kỹ thuật. Semantic HTML không chỉ là "học thêm thẻ", mà mang lại lợi ích trực tiếp cho SEO và accessibility. 
Thứ nhất, về SEO, các công cụ tìm kiếm như Google không chỉ đọc nội dung mà còn phân tích cấu trúc trang. Các thẻ như <header>, <main>, <article>, <nav> giúp Goole hiểu đâu là nội dung chính, đâu là điều hướng. Nếu dùng toàn <div>, trang sẽ trở thành <div soup>, khiến bot khó xác định nội dung quan trọng -> giảm thứ hạng tìm kiếm. 
Thứ hai, về accessibility, semantic HTML rất quan trọng với screen reader. Ví dụ, người khiếm thị có thể dùng phím tắt để nhảy giữa các <nav>, <main>, hoặc các heading <h1>-<h6>. Nếu tất cả đều là <div>, họ sẽ phải đọc tuần tự từ đầu đến cuối, giây trải nghiệm rất kém.
Ví dụ cụ thể: trong trang sản phẩm, nếu dùng <article> cho mỗi sản phẩm và <h1> cho tên sản phẩm, công cụ tìm kiếm và screen reader đều hiểu đây là nội dung độc lập quan trọng. Ngược lại, nếu chỉ dùng <div class="title">, thông tin này không có ý nghĩa gì đặc biệt về mặt semantic. 
Tuy nhiên, <div> vẫn cần thiết trong thực tế. Khi không có thẻ semantic phù hợp <ví dụ: container để layout, grouping phục vụ CSS hoặc JavaScript>, <div> là lựa chọn đúng. Vấn đề không phải là loại bỏ <div>, mà là dùng đúng chỗ.
Tóm lại, semantic HTML không làm chậm quá trình phát trình mà giúp code chuẩn hơn, dễ bảo trì hơn, và cải thiện SEO lẫn accessibility một cách rõ rệt.

            


