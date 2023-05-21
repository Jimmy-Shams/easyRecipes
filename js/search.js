let searchContainer = document.querySelector(`.search-container`);
let resultContainer = document.querySelector(`.result-container`);
let input = document.querySelector(`.search-input`);

let searchBtn = document.querySelector(`.search-btn`);

searchBtn.addEventListener("click", (e) => {
  getData(
    `recipes?searchContext=recipeName&searchValue=${input.value}`,
    false,
    true
  );
});

function populateResult() {
  let genHtml = "";
  resultContainer.innerHTML = "";
  searchResult.forEach((element) => {
    genHtml += recipeItemModel(element);
  });
  resultContainer.innerHTML += genHtml;
}
