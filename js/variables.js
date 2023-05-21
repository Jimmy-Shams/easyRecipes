let recipeContainer = document.querySelector(`.cards`);

let lastNavigatedRecipeId = "";

let contextData;
let searchResult;

let suggessionItems = [];

let mousePos = {
  x: 0,
  y: 0,
};

//model variable
let recipeItemModel = function (data) {
  console.log(data);

  return `<li class="cards_item" data-id="${data._id}">
    <div class="card">
      <div class="card_image">
        <img title="img" src=${data.recipeThumbnail} />
      </div>
      <div class="card_content">
        <div class="peer_info">
          <p class="views">views : ${data.recipeViews}</p>
          <p class="likes">likes :  ${data.recipeLikes}</p>
        </div>


        <h6>Tags:</h6>
        <div class="tags">
       
         ${data.recipeTags.map((elm) => {
           return `<tag>${elm["tag"]}</tag>`;
         })}
        </div>

        <h2 class="card_title">${data.recipeName}</h2>

        <p class="card_text">
          ${data.recipeDetails}
        </p>
        <a class="link_button" href="shopping-page.html"
          ><button class="btn card_btn">Read More</button></a
        >
      </div>
    </div>
  </li>`;
};
