function attachCartCode() {
  let cartButton = document.querySelectorAll(`.ingredient-buy`);

  cartButton.forEach((elm) => {
    elm.addEventListener("click", (e) => {
      let id = e.target.dataset["id"];

      getData(`ingredients/${id}`);
    });
  });
}

function handleCartFunction(data) {
  console.log(data);
  let updateObj = {};
  if (data.length <= 0) {
    invokeFloatingMsg("red", "this product is not in our stock!");
  } else {
    updateObj = {
      userCart: {
        $push: {
          cartProducts: {
            ingredientID: data._id,
            quantity: data.ingredientStockQuantity,
            price: data.ingredientPrice,
          },
        },
      },
      cartPrice: currentUser.cartPrice + data.ingredientPrice,
      cartID: new Date().getTime(),
    };
  }

  updateData(`users/${currentUser._id}`, updateObj);
}
