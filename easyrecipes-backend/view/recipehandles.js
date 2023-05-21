let editUpdateAddAtrributeCollectionQuery = function (key, val, command) {
  return `<div class="edit-cont">
  <label class="edit" for="edit">attributeName :</label>
  <div class="collection">
    <input type="text" name="edit" id="edit-${key}" ${
    command === "add" ? `placeholder=""` : `value=${val}`
  }/>
  </div>
</div>

<div class="edit-cont">
  <label class="edit" for="edit">attributeValue :</label>
  <div class="collection">
    <input type="text" name="edit" id="edit-${key}" ${
    command === "add" ? `placeholder=""` : `value=${val}`
  }/>
  </div>
</div>`;
};

let editUpdateAddIngredientCollectionQuery = function (key, val, command) {
  return `<div class="edit-cont">
  <label class="edit" for="edit">ingredientID :</label>
  <div class="collection">
    <input type="text" name="edit" id="edit-${key}" ${
    command === "add" ? `placeholder=""` : `value=${val}`
  }/>
  </div>
</div>

<div class="edit-cont">
  <label class="edit" for="edit">ingredientName :</label>
  <div class="collection">
    <input type="text" name="edit" id="edit-${key}" ${
    command === "add" ? `placeholder=""` : `value=${val}`
  }/>
  </div>
</div>

<div class="edit-cont">
  <label class="edit" for="edit">quantity :</label>
  <div class="collection">
    <input type="text" name="edit" id="edit-${key}" ${
    command === "add" ? `placeholder=""` : `value=${val}`
  }/>
  </div>
</div>

<div class="edit-cont">
  <label class="edit" for="edit">price :</label>
  <div class="collection">
    <input type="text" name="edit" id="edit-${key}" ${
    command === "add" ? `placeholder=""` : `value=${val}`
  }/>
  </div>
</div>`;
};

let editUpdateAddTagCollectionQuery = function (key, val, command) {
  return `<div class="edit-cont">
  <label class="edit" for="edit">tag :</label>
  <div class="collection">
    <input type="text" name="edit" id="edit-${key}" ${
    command === "add" ? `placeholder=""` : `value=${val}`
  }/>
  </div>
</div>`;
};

function recipeHandle(field, command) {
  let genHtml = "";

  genHtml += `<h1>${field}</h1>`;
  if (field === "attributeInfo") {
    genHtml += editUpdateAddAtrributeCollectionQuery("", "", command);
  } else if (field === "ingredients") {
    genHtml += editUpdateAddIngredientCollectionQuery("", "", command);
  } else if (field === "recipeTags") {
    genHtml += editUpdateAddTagCollectionQuery("", "", command);
  }
  genHtml += `<button
  class="add-update" data-field="${field}"> add </button>`;
  editWindow.recipeHandleWindow.innerHTML = genHtml;
}
