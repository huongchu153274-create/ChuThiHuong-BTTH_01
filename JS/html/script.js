//QUY TRÌNH 3 BƯỚC: Khi tôi nhấn vào click me> Phần tử có ID "message"
// sẽ thay đổi nội dung thành "Button Clicked!" và màu sắc thành đỏ.
// Bước 1: xác định các phần tử sẽ tuowg tác
let btnClick = document.getElementById("btnClickMe");
let message = document.getElementsByClassName("message"); //Lấy phàn tử đầu tiên có class"message"
// console.log(message[0].textContent);//kiếm tra phần tử được chọn
let parent = document.getElementById("parent");

//Bước 2: Thêm sự kiện click vào nút 
btnClickMe.addEventListener("click" () )
    

//Bước 3: Định nghĩa hàm xử lý sự kiện
function hamGiDo(){
    message.textContent = "Giá trị đã được thay đổi!";
    message.style.color = "red";
    message.style.backgroundColor = "yellow";


let newParagraph = document.createElement("p");
newParagraph.textContent = "Đoạn văn mới";
newParagraph.style.color = "blue";
parent.appendChild(newParagraph);
parent.removeChild(child); //Xóa phần tử con
}; 