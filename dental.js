
class khachHang
{
    constructor(fullname, caovoi, taytrang, chuphinh, tram, tongtien) {
        this.fullname = fullname;
        this.caovoi = caovoi;
        this.taytrang = taytrang;
        this.chuphinh = chuphinh;
        this.tram = tram;
        this.tongtien = tongtien;
    }
}

var Fullname = document.getElementById("edtTen");
var CaoVoi = document.getElementById("cbCaoVoi");
var TayTrang = document.getElementById("cbTayTrang");
var ChupHinh = document.getElementById("cbChupHinh");
var Tram = document.getElementById("edtTram");
var Tien = document.getElementById("txtTien");
var List = document.getElementById("listKH");

function thanhtoan()
{
    var fullname = Fullname.value;
    var cbCaoVoi = CaoVoi.checked;
    var cbTayTrang = TayTrang.checked;
    var cbChupHinh = ChupHinh.checked;
    var edtTram = Tram.value;

    if (fullname.length < 1) {
        alert("Vui lòng nhập tên khách hàng");
        return;
    }

    var dichVu = cbCaoVoi == true || cbTayTrang == true || cbChupHinh == true || edtTram > 0;
    if (!dichVu)
    {
        alert("Vui lòng chọn ít nhất 1 dịch vụ để thanh toán");
        return;
    }

    Tien.value = tinhtien();
    Tien.innerHTML = tinhtien();
    saveInfo();
}

function tinhtien()
{
    var cbCaoVoi = CaoVoi.checked;
    var cbTayTrang = TayTrang.checked;
    var cbChupHinh = ChupHinh.checked;
    var edtTram = Tram.value;

    var tongTien = 0;

    if (cbCaoVoi) tongTien += 100000;
    if (cbTayTrang) tongTien += 1200000;
    if (cbChupHinh) tongTien += 200000;

    tongTien += edtTram*80000;
    return tongTien;
}

function saveInfo()
{
    localStorage.setItem("fullname", Fullname.value);
    localStorage.setItem("cbCaoVoi", CaoVoi.checked);
    localStorage.setItem("cbTayTrang", TayTrang.checked);
    localStorage.setItem("cbChupHinh", ChupHinh.checked);
    localStorage.setItem("edtTram", Tram.value);
    localStorage.setItem("txtTien", Tien.value);

    var kh = new khachHang(Fullname.value, CaoVoi.checked, TayTrang.checked, ChupHinh.checked, Tram.value, Tien.value);
    var number  = localStorage.getItem("number");
    if (number == null)
        number = 0;
    
    number++;
    
    localStorage.setItem("kh" + number, JSON.stringify(kh));
    localStorage.setItem("number", number);
    loadListCustomer();
}

function reset()
{
    if (!confirm("Bạn có muốn xóa các thông tin trên?")) 
        return;

    Fullname.value = "";
    Tram.value = 0;
    CaoVoi.checked = false;
    TayTrang.checked = false;
    ChupHinh.checked = false;
    Tien.innerText = 0;
}

function loadInfo()
{
    var fullname = localStorage.getItem("fullname");
    var cbCaoVoi = localStorage.getItem("cbCaoVoi");
    var cbTayTrang = localStorage.getItem("cbTayTrang");
    var cbChupHinh = localStorage.getItem("cbChupHinh");
    var edtTram = localStorage.getItem("edtTram");
    var txtTien = localStorage.getItem("txtTien");
    
    Fullname.value = fullname;
    
    CaoVoi.checked = cbCaoVoi == 'true';
    TayTrang.checked = cbTayTrang == 'true';
    ChupHinh.checked = cbChupHinh == 'true';
    
    Tram.value = (edtTram == null) ? 0 : edtTram;
    Tien.innerText = (txtTien == null) ? '0' : txtTien;
}


function loadListCustomer()
{
    List.innerHTML = "";
    var i = 1;
    while (true)
    {
        var j =  localStorage.getItem("kh" + i);
        if (j == null) 
            return;

        var kh = JSON.parse(j);

        List.innerHTML += "<option value='"+i+"'>"+kh.fullname+"</option>";

        i++;
    }
}

function loadCustomer() {
    var id = List.value;
    if (id == null) 
        return;

    var i =  localStorage.getItem("kh" + id);
    if (i == null) 
        return;

    var kh = JSON.parse(i);

    Fullname.value = kh.fullname;
    Tram.value = kh.tram;
    CaoVoi.checked = kh.caovoi;
    TayTrang.checked = kh.taytrang;
    ChupHinh.checked = kh.chuphinh;
    Tien.innerText = kh.tongtien;
    return 1;
}

loadListCustomer();