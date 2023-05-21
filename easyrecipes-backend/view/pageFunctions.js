function generateRenderpage(data) {
  console.log(data);

  renderPage.innerHTML = superTableGenerator(data);
}

//calls contextmenu
function callContextMenu(command, x, y, context) {
  if (context === "add")
    contextMenu.innerHTML = `<button class="menu_item menu_item-add">add</button>`;
  else if (context === "mod")
    contextMenu.innerHTML = `<button class="menu_item menu_item-delete">delete</button>
    <button class="menu_item menu_item-update">update</button>`;
  if (command) {
    contextMenu.style = `opacity: 1;pointer-events: all; top:${y}px; left:${x}px;`;
  } else
    contextMenu.style = `opacity: 0;pointer-events: none;top:${y}px; left:${x}px;`;
}

let editUpdateInputQuery = function (key, val, command) {
  return `<div class="edit-cont">
    <label class="edit" for="edit">${key} :</label>
    <input
      type="text"
      name="edit"
      id="edit-${key}"
      ${command === "add" ? `placeholder=${key}` : `value=${val}`}
    />
    ${command === "add" ? "" : `<button class="edit-update">update</button>`}
  </div>
</div>`;
};

let editUpdateCollectionQuery = function (key, val, command) {
  return `<div class="edit-cont">
    <label class="edit" for="edit">${key} :</label>
    <div class="collection">
    ${generateCollection(val, key)}
    </div>
  <button class="add-collection" data-field=${key}>add collection</button>
  </div>
</div>`;
};

function generateCollection(collection, key) {
  let generatedHtml = "";

  collection.map((elm) => {
    let collectionitem = "";

    for (keyinner in elm) {
      collectionitem += `<p>${keyinner} : ${elm[keyinner]} </p>`;
    }

    generatedHtml += `<div class='collectionitem ${key}'>${collectionitem}  <img class="delete-attribute" data-id=${elm._id} data-field=${key} src="./x.svg" alt=""
    /></div>`;
  });
  return generatedHtml;
}

//renders updation page
function renderUpdatePage(contextItem, command, starter) {
  let generatedPage = "";
  let dataModel = {};
  model = {};

  console.log("called with", contextItem);

  lastCommand = command;

  if (contextItem !== undefined && contextItem !== null)
    Object.entries(contextItem).map(([key, val] = entry) => {
      let conditionParam = key.toLowerCase();
      if (conditionParam !== "__v" && conditionParam !== "_id") {
        if (starter) {
          dataModel[key] = "";
        } else {
          dataModel[key] = contextItem[key];
        }
      }

      if (
        (conditionParam !== "__v" &&
          conditionParam !== "_id" &&
          conditionParam !== "" &&
          !conditionParam.includes("id") &&
          !conditionParam.includes("likes") &&
          !conditionParam.includes("views") &&
          !conditionParam.includes("cart") &&
          !conditionParam.includes("history") &&
          !conditionParam.includes("clicked") &&
          !conditionParam.includes("comment") &&
          !conditionParam.includes("rating") &&
          !conditionParam.includes("comment") &&
          !conditionParam.includes("date") &&
          !conditionParam.includes("active")) ||
        conditionParam.includes("birthdate") ||
        conditionParam === "videolink"
      ) {
        console.log(key, contextItem[key]);
        if (
          conditionParam.includes("attributeinfo") ||
          conditionParam.includes("tags") ||
          conditionParam === "ingredients"
        ) {
          if (starter) {
            dataModel[key] = [];
          }
          if (command === "add") {
            val = dataModel[key];
          }

          generatedPage += editUpdateCollectionQuery(key, val, command);
        } else {
          generatedPage += editUpdateInputQuery(key, val, command);
        }
      } else if (
        (conditionParam.includes("likes") ||
          conditionParam.includes("views")) &&
        command === "add"
      ) {
        dataModel[key] = 0;
      }
    });

  if (command === "add") {
    generatedPage += `<button class="edit-add">add</button>`;
  }

  editWindow.editCont.innerHTML = generatedPage;
  console.log("datamodel:", dataModel);

  if (command === "add") model = dataModel;
  callUpdatePage(true);
}

//views update page
function callUpdatePage(command) {
  if (command) editWindow.editCont.style = "display:flex";
  else editWindow.editCont.style = "";
}

function callRecipeHandlePage(command) {
  if (command) editWindow.recipeHandleWindow.style = "display:flex";
  else editWindow.recipeHandleWindow.style = "";
}
