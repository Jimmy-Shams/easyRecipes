adminButtons.forEach((elm, ind) => {
  //click actions for all admin buttons
  elm.addEventListener("click", (e) => {
    adminButtons.forEach((elm, ind) => {
      elm.classList.remove("active");
    });
    let target = e.target;
    target.classList.add("active");

    getData(target.textContent);
    console.log(target.textContent);
    contextInfo.database = target.textContent;
  });
});

//global click event handler
document.body.addEventListener("click", (e) => {
  let target = e.target;
  let targetClass = target.className;
  callContextMenu(false, e.clientX, e.clientY);

  //update page init
  if (targetClass.includes("menu_item-update")) {
    renderUpdatePage(contextData[+contextInfo.lastindex], "edit");
  }

  //add page init
  if (targetClass.includes("menu_item-add")) {
    renderUpdatePage(contextData[0], "add", true);
  }

  //delete page init
  if (targetClass.includes("menu_item-delete")) {
    console.log("called");

    deleteData(contextInfo.database + "/" + contextInfo.lastFieldID);
  }

  //update button handler
  if (targetClass.includes("edit-update")) {
    let targetParent = target.closest(".edit-cont");
    let contextInput = targetParent.querySelector("input").value;
    let contextInputLabel = targetParent
      .querySelector("label")
      .textContent.split(":")[0]
      .trim();

    console.log(contextInput, model);
    if (contextInputLabel.toLowerCase().includes("tags"))
      contextInput = contextInput.split(",").map((elm) => elm.trim());

    model[contextInputLabel] = contextInput;

    updateData(contextInfo.database + "/" + contextInfo.lastFieldID, model);
  }

  if (targetClass.includes("add-update")) {
    let targetParent = target.closest(".recipe-handle-window");
    let fieldName = target.dataset["field"];

    let contextInput = targetParent.querySelectorAll("input");

    let newModel = {};

    contextInput.forEach((elm, ind) => {
      let contextInputLabel = targetParent
        .querySelectorAll("label")
        [ind].textContent.split(":")[0]
        .trim();

      let value = elm.value;

      if (contextInputLabel.toLowerCase().includes("tags"))
        value = elm.value.split(",").map((elm) => elm.trim());

      newModel[contextInputLabel] = value;
    });
    let modelObj = {};
    modelObj[fieldName] = newModel;
    if (lastCommand === "edit") {
      let updateObj = { $push: modelObj };
      console.log(updateObj);

      updateData(
        contextInfo.database + "/" + contextInfo.lastFieldID,
        updateObj
      );
    } else {
      model[fieldName].push(newModel);
      renderUpdatePage(model, "add");
    }
  }

  //add button handler
  if (targetClass.includes("edit-add")) {
    let targetParent = target.closest(".edit-window");

    let contextInput = targetParent.querySelectorAll("input");

    contextInput.forEach((elm, ind) => {
      let contextInputLabel = targetParent
        .querySelectorAll("label")
        [ind].textContent.split(":")[0]
        .trim();

      let value = elm.value;

      if (contextInputLabel.toLowerCase().includes("tags"))
        value = elm.value.split(",").map((elm) => elm.trim());

      model[contextInputLabel] = value;
    });

    if (contextInfo.database === "recipes") {
      model.rating = 0;
      model.comments = [];
      model.creationDate = new Date().getTime();
      model.recipeID = new Date().getTime();
    } else if (contextInfo.database === "support") {
      model.supportActiveStatus = false;
      model.supportID = new Date().getTime();
    } else if (contextInfo.database === "ingredients") {
      model.ingredientID = new Date().getTime();
    } else if (contextInfo.database === "user") {
    }

    updloadData(contextInfo.database + "/", model);
  }

  if (targetClass === "delete-attribute") {
    let id = target.dataset["id"];
    let fieldName = target.dataset["field"];
    console.log(fieldName);
    let fieldToDel = {};
    fieldToDel[fieldName] = { _id: id };
    model = { $pull: fieldToDel };

    updateData(contextInfo.database + "/" + contextInfo.lastFieldID, model);
  }

  if (targetClass === "add-collection") {
    let fieldName = target.dataset["field"];

    callRecipeHandlePage(true);
    recipeHandle(fieldName);
  }

  //closes update page
  if (targetClass.includes("edit-window")) {
    callUpdatePage(false);
    callRecipeHandlePage(false);
  }

  if (
    !target.closest(".recipe-handle-window") &&
    targetClass !== "add-collection"
  ) {
    callRecipeHandlePage(false);
  }
});

//contextmenu click handler
document.body.addEventListener("contextmenu", (e) => {
  let target = e.target;
  let targetClass = target.className;

  //sets the context data for delete/update menu
  if (targetClass.includes("table-desc")) {
    let index = target.dataset.index;
    let fieldID = target.dataset.id;
    contextInfo.lastFieldID = fieldID;
    contextInfo.lastindex = index;

    callContextMenu(true, e.clientX, e.clientY, "mod");
    e.preventDefault();
  }

  //sets the context table for adding data
  if (targetClass.includes("table-head")) {
    callContextMenu(true, e.clientX, e.clientY, "add");
    e.preventDefault();
  }
});
