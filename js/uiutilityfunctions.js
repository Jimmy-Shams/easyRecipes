function updateRecipeContainer(data) {
  let generatedRecipes = "";
  console.log(data);

  data.forEach((element) => {
    generatedRecipes += recipeItemModel(element);
  });

  recipeContainer.innerHTML = generatedRecipes;
}
