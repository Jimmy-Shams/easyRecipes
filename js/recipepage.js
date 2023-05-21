function invokeRecipePage() {
  let recipeId = localStorage.getItem("recipeID");

  getData(`recipes/${recipeId}`, false);
}

invokeRecipePage();

function saveClickedTags(data) {
  let updateObj = {};
  let tagObjectArrayPush = [];
  let tagObjectArraySet = [];

  if (isLoggedIn) {
    console.log(currentUser.userClickedTags);

    data.recipeTags.forEach((elmRecipe) => {
      let exist = false;
      currentUser.userClickedTags.forEach((elm) => {
        if (elm) {
          if (elm.tag === elmRecipe.tag) {
            elm.clicked = elm.clicked + 1;
            exist = true;
          }
        }
      });
      console.log(exist, elmRecipe.tag);

      if (!exist) {
        tagObjectArrayPush.push({ tag: elmRecipe.tag, clicked: 1 });
      }
    });

    if (tagObjectArrayPush.length > 0) {
      updateObj = {
        $push: {
          userClickedTags: {
            $each: tagObjectArrayPush,
            $sort: { clicked: -1 },
          },
        },
      };
    } else {
      tagObjectArraySet = currentUser.userClickedTags;
      updateObj = { userClickedTags: tagObjectArraySet };
      console.log(tagObjectArraySet);
    }

    updateData(`users/${currentUser._id}`, updateObj);
  }
}

function renderRecipePage(data) {
  console.log(data);
  saveClickedTags(data);

  let h1 = document.querySelector(`h1`);

  let containers = document.querySelectorAll(`.list_items`);
  let likes = document.querySelector(`.likes`);
  let views = document.querySelector(`.views`);
  let time = document.querySelector(`h6`);
  let video = document.querySelector(`.video-recipe`);
  let attributes = document.querySelector(`.detail_time`);

  video.src = data.videoLink;

  data.attributeInfo.forEach((elm) => {
    attributes.innerHTML += `<h5><span class="fw-bolder h5">${elm["attributeName"]}</span><br>${elm["attributeValue"]}</h5>`;
  });

  time.textContent =
    "Updated at " + data.updatedDate.replace("T", " ").replace("Z", " ");

  h1.textContent = data.recipeName;

  containers[0].innerHTML = "";
  data.ingredients.forEach((element) => {
    containers[0].innerHTML += `<ingredient><p class="ingredient-detail">name : ${element["ingredientName"]}</p><p class="ingredient-detail">quantity : ${element["quantity"]}</p><p class="ingredient-detail">price : ${element["price"]}</p><button class="ingredient-buy" data-id=${element.ingredientID}>add to cart</button></ingredient>`;
  });

  attachCartCode();

  likes.textContent = "likes : " + data.recipeLikes + "   ";
  views.textContent = "views : " + data.recipeViews + "   ";

  containers[1].innerHTML = `<p>${data.recipeDetails}</p>`;

  generateTestiMonials(data);
}

function generateTestiMonials(data) {
  let testimDots = document.querySelector(`.dots`);
  let testimContent = document.querySelector(`.cont`);

  testimDots.innerHTML = "";
  testimContent.innerHTML = "";
  data.comments.forEach((elm, ind) => {
    testimDots.innerHTML += `<li class="dot ${
      ind === 0 ? "active" : ""
    }"></li>`;
    testimContent.innerHTML += `<div class="${ind === 0 ? "active" : ""}">
    <div class="img"><img src="${elm.userPic}" alt=""></div>
    <h2>${elm.userName}</h2>
    <p>
      ${elm["commentText"]}
    </p>
  </div>`;
  });

  callTestimLoad();
}
