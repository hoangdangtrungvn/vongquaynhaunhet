var res = [
 {t:'1 LY'},
 {t:'QUYỀN TRỢ GIÚP'},
 {t:'2 LY'},
 {t:'QUA TUA'},
 {t:'1 LY'},
 {t:'BÊN TRÁI UỐNG'},
 {t:'3 LY'},
 {t:'QUA TUA'},
 {t:'1 LY'},
 {t:'BÊN PHẢI UỐNG'},
 {t:'2 LY'},
 {t:'QUA TUA'}
];
var res2 = [
 {t:'THÊM LƯỢT'},
 {t:'BÊN PHẢI UỐNG'},
 {t:'UỐNG NỬA LY'},
 {t:'UỐNG 1 LY'},
 {t:'BÊN TRÁI UỐNG'},
 {t:'ĐỐI DIỆN UỐNG'},
 {t:'CHỈ 1 NG UỐNG'},
 {t:'UỐNG CÙNG 1 NG'},
 {t:'ĐƯỢC ÔM 1 CÁI'},
 {t:'UỐNG 2 LY'},
 {t:'THOÁT NẠN'},
 {t:'ĐỒNG KHỞI'}
];
var check = false;
var ivel = 2.0;   // hệ số tốc độ quay ban đầu
var slow = 0.97;  // hệ số tốc độ quay chậm lại
var theta = 0.0;  // góc quay bánh xe
var ltime = 0;    // thời gian của khung hình chuyển động cuối cùng
var rps = 0.0;    // tốc độ quay hiện tại (radian/giây)
var timer = null; // thời gian chuyển động
function init(){
  document.getElementById('ctxt').innerHTML = 'KẾT QUẢ';
  var cv = document.getElementById('canvas');
  if (!cv) return; // trình duyệt không hỗ trợ canvas
  draw();
}
function changeMode(){
  if (check == false)
    check = true;
  else
    check = false;
  document.getElementById('ctxt').innerHTML = 'KẾT QUẢ';
  draw();
}
function draw(){
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.save();
  // vẽ bánh xe
  ctx.translate(152.5, 157.5);
  ctx.rotate(theta-0.01);
  ctx.translate(-152.5, -157.5);
  if (check==true)
    ctx.drawImage(document.getElementById('banhxe'),0,5);
  else
    ctx.drawImage(document.getElementById('wheel'),0,5);
  // vẽ con trỏ
  ctx.restore();
  var ipt = document.getElementById('point');
  ctx.drawImage(ipt,141,0);
}
function animate(){
  var t = new Date().getTime();
  var dt = t-window.ltime;
  window.theta += (window.rps*(dt/1000.0));
  window.theta = window.theta%(Math.PI*2.0);
  window.ltime = t;
  window.rps *= window.slow;
  draw();
  if (window.rps<0.05){ // quay xong
    // dừng chuyển động
    clearInterval(window.timer);
    // hiện kết quả
    var num = Math.floor(window.theta/((Math.PI*2.0)/res.length));
	if (check == true)
	  document.getElementById('ctxt').innerHTML = window.res2[num].t;
	else
	  document.getElementById('ctxt').innerHTML = window.res[num].t;
    // hiện nút quay
    document.getElementById('spin').style.display = 'block';
    // hiện nút chế độ
    document.getElementById('mode').style.display = 'block';
	// ẩn nút quay đã nhấn
    document.getElementById('spinp').style.display = 'none';
    // ẩn nút chế độ đã nhấn
    document.getElementById('modep').style.display = 'none';
  }
}
function doSpin(){
  window.rps = (Math.PI*window.ivel)+(Math.random()*(window.ivel/2.0)); // thiết lập tốc độ quay ngẫu nhiên
  window.ltime = new Date().getTime();
  // bắt đầu chuyển động
  window.timer = setInterval("animate();", 50);
  // ẩn kết quả
  document.getElementById('ctxt').innerHTML = 'KẾT QUẢ';
  // ẩn nút quay
  document.getElementById('spin').style.display = 'none';
  // ẩn nút chế độ
  document.getElementById('mode').style.display = 'none';
  // hiện nút quay đã nhấn
  document.getElementById('spinp').style.display = 'block';
  // hiện nút chế độ đã nhấn
  document.getElementById('modep').style.display = 'block';
}
