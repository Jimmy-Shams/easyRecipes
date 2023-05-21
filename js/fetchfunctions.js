async function getData(context, containerQuery, search) {
  fetch(`http://localhost:3000/${context}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      contextData = data.data.items;

      if (search) {
        searchResult = contextData;
        populateResult();
      } else if (context.includes("recipes")) {
        if (containerQuery) updateRecipeContainer(contextData);
        else renderRecipePage(contextData);
      } else if (context.includes("users")) {
        localStorage.setItem("user", JSON.stringify(contextData));
        profileImg.src = currentUser.userProfilePic;
      } else if (context.includes("ingredients")) {
        handleCartFunction(contextData);
      }
    })
    .catch((err) => {
      throw err;
    });
}

async function updateData(context, data, update) {
  fetch(`http://localhost:3000/${context}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (update === "comment") {
        renderRecipePage(data.data.items);
      }
    })
    .catch((err) => {
      throw err;
    });
}

async function uploadData(context, data, query) {
  fetch(`http://localhost:3000/${context}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (query) {
        suggessionItems = data.data.items;
        populateSuggession();
      }
      console.log(data);
    })
    .catch((err) => {
      throw err;
    });
}

async function deleteData(context) {
  fetch(`http://localhost:3000/${context}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      getData(contextInfo.database);
    })
    .catch((err) => {
      throw err;
    });
}
