let adminButtons = document.querySelectorAll(`.admin_button`);
let renderPage = document.querySelector(`main`);

let editWindow = {
  editCont: document.querySelector(`.edit-window`),
  edit_update: document.querySelector(`.edit-update`),
  recipeHandleWindow: document.querySelector(`.recipe-handle-window`),
};

let lastCommand = "";

let contextData = [];

let contextMenu = document.querySelector(`.database-context_menu`);

let contextInfo = { lastindex: "", lastFieldID: "", database: "", tags: [] };

let recipeModel = {
  recipeName: "",
  recipeID: "",
  recipeThumbnail: "",
  videoLink: "",
  recipeDetails: "",
  recipeViews: 0,
  recipeLikes: 0,
  recipeTags: [],
  creationDate: "",
};

let model = {};
