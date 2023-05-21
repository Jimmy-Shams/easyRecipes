let userinfoCont = document.querySelector(`.userinfo_cont`);

let userInfoModel = function (key, data) {
  return `<div class="userinfo">${key} : ${data}</div>`;
};

let genHtml = "";
for (key in currentUser) {
  genHtml += userInfoModel(key, currentUser[key]);
}
genHtml += ` <button class="logout">Logout</button>`;
userinfoCont.innerHTML = genHtml;
let logout = document.querySelector(`.logout`);

logout.addEventListener("click", () => {
  localStorage.setItem("isLoggedIn", false);
  localStorage.setItem("user", JSON.stringify({}));

  location.href = "./";
});
