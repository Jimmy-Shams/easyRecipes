async function getData(context) {
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
      generateRenderpage(contextData);
    })
    .catch((err) => {
      throw err;
    });
}

async function updateData(context, data) {
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
      getData(contextInfo.database);
      console.log("new", data.data.items);

      renderUpdatePage(data.data.items, lastCommand);
    })
    .catch((err) => {
      throw err;
    });
}

async function updloadData(context, data) {
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
      getData(contextInfo.database);
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
      getData(contextInfo.database);
    })
    .catch((err) => {
      throw err;
    });
}
