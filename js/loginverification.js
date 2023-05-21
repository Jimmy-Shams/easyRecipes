let loginRegisterInvoker = document.querySelector(`.login_register_invoker`);
let userProfielPic = document.querySelector(`.user_picture`);
let profileImg = document.querySelector(`.user_picture img`);
let cartRibbon = document.querySelector(`.ribbon`);

let currentUser = {};

let isLoggedIn = false;

let loginState = localStorage.getItem("isLoggedIn");

if (loginState !== "false") {
  isLoggedIn = true;
  cartRibbon.style = "display:block";
  currentUser = JSON.parse(localStorage.getItem("user"));
  getData(`users/${currentUser._id}`);
  loginRegisterInvoker.textContent = "profile";
  loginRegisterInvoker.href = "./userpage.html";
  userProfielPic.style = "display: block";
}
