let mainContainer = document.querySelector(`.main_container`);
let header = document.querySelector(".header");
let subtitle = document.querySelector(`.subtitle`);
let animation_text_container = document.querySelector(`.header_animated_text `);
let registerBtn = document.querySelector(`.register`);
let register_login_btn = document.querySelector(`.register_login`);
let registerBtnImg = document.querySelector(`.btn_img`);
let loginBtnImg = document.querySelector(`.btn_img_register`);
let siginCont = document.querySelector(`.inner_query_container`);
let registerCont = document.querySelector(`.inner_query_container--register`);
let forgot_pass_cont = document.querySelector(`.forgot_password`);
let calender = document.querySelector(`#select_birthdate`);
let before = document.querySelector(`.before`);
let after = document.querySelector(`.after`);
let loginInputs = siginCont.querySelectorAll(`.input`);
let registerInputs = registerCont.querySelectorAll(`.input`);

let infoBox = document.querySelector(`.info_box`);

let logic = {
  pagefold: 1,
  loggedIn: false,
};

function generalAnimation(elements, animations) {
  elements.forEach((element, ind) => {
    element.style = animations[ind];
  });
}

function resetAnimation() {
  let left = window.getComputedStyle(before, null).getPropertyValue("left");
  console.log(left);

  if (left === "86.6875px") {
    before.style = `animation: none;left:0;`;
    after.style = `animation:none;left:0;`;

    setTimeout(() => {
      before.style = `animation: var(--typewriter_before);left:0;`;
      after.style = `animation: var(--typewriter_animation);left:0;`;
    }, 200);
  }
}

function loginProcess(data) {
  getData("users");

  setTimeout(() => {
    let pass = validateInputs(data);
    if (pass !== "pass") {
      invokeInfoBox("red", pass);
      return pass;
    }

    pass = checkData(data, contextData);

    if (pass) {
      initLogin(1);
    } else invokeInfoBox("red", "Username or Password is wrong!");
  }, 500);
}

function checkData(data, recieved) {
  for (let i = 0; i < recieved.length; i++) {
    if (data.userName === recieved[i].userName) {
      if (data.userPass === recieved[i].userPass) {
        localStorage.setItem("user", JSON.stringify(recieved[i]));
        return true;
      }
    }
  }

  return false;
}

function checkDataReg(data, recieved) {
  for (let i = 0; i < recieved.length; i++) {
    if (data.userName === recieved[i].userName) {
      return false;
    }
  }

  return true;
}

function initLogin(command) {
  if (command) {
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    location.href = "/";
  } else {
    localStorage.setItem("isLoggedIn", false);
  }
}

function registerProcess(data) {
  getData("users");

  setTimeout(() => {
    let pass = validateInputs(data);

    console.log(data);

    if (pass !== "pass") {
      invokeInfoBox("red", pass);
      return pass;
    }

    console.log("data", data, contextData);

    pass = checkDataReg(data, contextData);

    if (pass) {
      data["userID"] = new Date().getTime();
      data["userCart"] = {
        cartProducts: [],
        cartID: "mina",
        cartPrice: 124,
      };

      data["userClickedTags"] = [];
      console.log(data);

      invokeInfoBox("green", "Registered!");
      uploadData("users", data);
    } else {
      invokeInfoBox(
        "red",
        "User exists! Try a different name!(Use special characters if needed)"
      );
    }
  }, 500);
}

function foldPage() {
  if (logic.pagefold === 1) {
    generalAnimation(
      [siginCont, registerCont, animation_text_container, forgot_pass_cont],
      [
        "transform:translateX(-500px);max-height: 170px;",
        "transform:translateX(-500px);max-height: 320px;",
        "min-height: 100px;",
        "display:none",
      ]
    );
    setTimeout(() => {
      generalAnimation(
        [siginCont, registerCont],
        [
          "display:none",
          "transform:translateX(0px);max-height: 320px;transition:0s;",
        ]
      );
    }, 800);
    logic.pagefold = 2;
    subtitle.textContent = "Please register to continue >";
    resetAnimation();
  } else {
    generalAnimation(
      [siginCont, registerCont, animation_text_container, forgot_pass_cont],
      [
        "transform:translateX(-500px);max-height: 170px;",
        "transform:translateX(-500px);max-height: 170px;",
        "min-height: 200px;",
        "display:block",
      ]
    );
    setTimeout(() => {
      generalAnimation(
        [siginCont, registerCont],
        [
          "transform:translateX(0px);max-height: 170px;",
          "transform:translateX(500px);max-height: 170px;",
        ]
      );
    }, 400);
    logic.pagefold = 1;
    subtitle.textContent = "Please login to continue >";
    resetAnimation();
  }
}

function handleQuery(reference) {
  let data = extractAndReturnValues(reference);

  if (Object.keys(data).length < 3) loginProcess(data);
  else registerProcess(data);
}

document.addEventListener("click", (e) => {
  let targetClass = e.target.className;
  // console.log(targetClass);

  if (targetClass === "register") {
    foldPage();
  }

  if (targetClass === "login") {
    handleQuery(loginInputs);
  }

  if (targetClass === "register_login") {
    foldPage();
  }

  if (targetClass === "register_register") {
    handleQuery(registerInputs);
  }
});

function invokeInfoBox(color, message) {
  infoBox.style = `background-color:${color};opacity:1;`;
  infoBox.textContent = message;

  setTimeout(() => {
    infoBox.style = ``;
  }, 4000);
}
