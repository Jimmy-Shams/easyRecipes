let floatingCont = document.querySelector(`.floating_msg`);

function invokeFloatingMsg(color, msg) {
  floatingCont.textContent = msg;
  floatingCont.style = `opacity:1;background-color:${color};`;

  setTimeout(() => {
    floatingCont.style = "";
  }, 3000);
}
