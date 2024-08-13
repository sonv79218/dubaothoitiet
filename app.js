// đặt biến thôi
// lấy ra phần tử có class là search
var search = document.querySelector(".search");

var city = document.querySelector(".city");
var country = document.querySelector(".country");
var value = document.querySelector(".value");
var shortDesc = document.querySelector(".short-desc");
var visibility = document.querySelector(".visibility span");
var wind = document.querySelector(".wind span");
var sun = document.querySelector(".sun span");
var time = document.querySelector(".time");
var content = document.querySelector(".content");
var body = document.querySelector("body");
content.classList.add("hide");
// hàm thay đổi dữ liệu thời tiết theo ipa
async function changeWeatherUI() {
  // đặt tên biến capital value
  let capitalSearch = search.value.trim();
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capitalSearch}&appid=857188704aa7d0f9fabe0cd6121b74a3`;
  let data = await fetch(apiURL).then((res) => res.json());
  if (data.cod == 200) {
    content.classList.remove("hide");
    // let capitalSearch = search.value.trim();
    // let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capitalSearch}&appid=857188704aa7d0f9fabe0cd6121b74a3`;
    // let data = await fetch(apiURL).then((res) => res.json());
    // console.log(data);
    // đổi biến thành dữ liệu từ API
    // lưu thông tin từ json vào biến
    city.innerText = data.name;
    country.innerText = data.sys.country;
    visibility.innerText = data.visibility + "m";
    wind.innerText = data.wind.speed + "m/s";
    sun.innerText = data.main.humidity + "m%";
    // làm tròn số math.round
    let temp = (value.innerText = Math.round(data.main.temp - 273.15));
    // vì weather là kiểu mảng
    shortDesc.innerText = data.weather[0].main;
    time.innerText = new Date().toLocaleString("vi");
    // body.setAttribute("class", "hot");
    if (temp < 25) {
      body.setAttribute("class", "cool");
    } else if (temp > 30) {
      body.setAttribute("class", "hot");
    } else {
      // nếu mà nhiệt độ thế nào thì thêm class nào đấy vào body
      // câu hỏi là tại sao được add cả 2 ?? à vì cái .warm và .warm #weather đều là .warm nên nó thay đổi hết
      body.setAttribute("class", "warm");
    }
  } else {
    // console.log("not found");
    content.classList.add("hide");
  }
}
// hàm có tác dụng là tìm kiếm theo tên
// addeventlistener thực hiện sự kiện khi bấm enter
search.addEventListener("keypress", function (e) {
  if (e.code === "Enter") {
    changeWeatherUI();
  }
});
