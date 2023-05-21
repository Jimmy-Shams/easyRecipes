let suggestText = document.querySelector(`.suggested`);
let suggestContainer = document.querySelector(`.cards-suggested`);

if (isLoggedIn) updateSuggessions();

function updateSuggessions() {
  let tagArray = [];
  currentUser.userClickedTags.forEach((element) => {
    tagArray.push(element.tag);
  });
  let tagObjArray = tagArray;
  let queryObj = { "recipeTags.tag": { $in: tagObjArray } };
  console.log("query", queryObj);

  uploadData(`recipesbyobj`, queryObj, true);
}

function populateSuggession() {
  let genHtml = "";
  suggessionItems.forEach((elm) => {
    genHtml += recipeItemModel(elm);
  });
  suggestContainer.innerHTML = genHtml;
}
