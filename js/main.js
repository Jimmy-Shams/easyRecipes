getData(
  "recipes?fields=recipeName,recipeLikes,recipeTags,recipeViews,thumbnail,recipeDetails,recipeThumbnail ",
  true
);

if (isLoggedIn === false || currentUser.userClickedTags.length <= 0) {
  suggestContainer.style = "display:none";
  suggestText.style = "display:none";
}

document.addEventListener("click", (e) => {
  let target = e.target;
  let className = target.className;

  if (className.includes("card_btn")) {
    e.preventDefault();

    let container = target.closest(".cards_item");
    lastNavigatedRecipeId = container.dataset["id"];
    localStorage.setItem("recipeID", lastNavigatedRecipeId);

    location.href = "../shopping-page.html";
  }

  if (!target.closest(".result-container")) {
    resultContainer.innerHTML = "";
  }
});
