import recipes from "../models/recipeModel.js";

let demoData = {
  recipeName: "King kong",
  recipeID: "King kong jr",
  recipeThumbnail: "King kong",
  videoLink: "King kong",
  recipeDetails: "King kong",
  recipeViews: 2445,
  recipeLikes: 1,
  recipeTags: [{ tag: "mainland" }],
  comments: [
    {
      userID: "3423",
      commentID: "35233",
      commentText: "tesxt",
      commentLikes: 35,
    },
  ],
  attributeInfo: [{ attributeName: "data", attributeValue: "value" }],
  creationDate: 1032324123,
  ingredients: [
    {
      ingredientID: "imsdasf",
      ingredientName: "soda",
      quantity: 345,
      price: 4564,
    },
  ],
  rating: 3.4,
};

function matchKey(item, fieldName, pattern) {
  //main filter

  let token = pattern.toLowerCase().trim();

  if (token === "") return true;

  if (item[`${fieldName}`].toLowerCase().includes(token)) {
    return true;
  } else return false;
}

function filterByToken(collection, fieldName, token) {
  let formedCollection = [];

  for (let i = 0; i < collection.length; i++) {
    let matches = matchKey(collection[i], fieldName, token);

    if (matches) {
      formedCollection.push(collection[i]);
    }
  }

  return formedCollection;
}

export async function getRecipe(req, res) {
  console.log("Read request made at recipeData.");
  let objectToFilterBy = req.body;
  let queryObj = {};
  //filter

  let queryData = { ...req.query };

  let queryString = JSON.stringify(queryData);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (match) => `$${match}`
  );

  queryData = JSON.parse(queryString);
  if (objectToFilterBy) {
    queryObj = objectToFilterBy;
  }
  console.log("query", queryObj);

  let query = recipes.find(queryObj);

  if (queryData.sort) {
    let sortString = queryData.sort.split(",").join(" ");
    query = query.sort(sortString);
  }

  if (queryData.fields) {
    let fields = queryData.fields.split(",").join(" ");
    query = query.select(fields);
  }

  let page = queryData.page * 1 || 1;
  const limit = queryData.limit * 1 || 100;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  try {
    let items;
    if (req.params.id) {
      items = await recipes.findById(req.params.id);
    } else {
      items = await query;
      let searchContext = queryData.searchContext;
      console.log(searchContext);

      if (searchContext?.includes("Name")) {
        console.log("done");

        items = filterByToken(items, searchContext, queryData["searchValue"]);
      }

      console.log(queryData);
    }
    res.status(200).json({
      status: "read success",
      results: items.length,
      data: {
        items,
      },
    });
  } catch (error) {
    console.log("error", error);
  }
}

export async function deleteRecipe(req, res) {
  console.log("delete request made at recipeData.", req.params.id);
  try {
    await recipes.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "read success",
      results: "deleted" + req.params.id,
    });
  } catch (error) {
    console.log("error", error);
  }
}

export async function updateRecipe(req, res) {
  console.log("Update request made at recipeData.");
  console.log(req.params.id, req.body);

  try {
    let items;
    if (req.params.id) {
      items = await recipes.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
    }
    res.status(200).json({
      status: "write success",
      results: items.length,
      data: {
        items,
      },
    });
  } catch (error) {
    console.log("error", error);
  }
}

export async function uploadRecipe(req, res) {
  console.log("Upload request made at recipeData.");

  console.log(req.params.id, req.body);

  try {
    const newRecipe = await recipes.create(req.body);

    res.status(201).json({
      status: "creation success",
      data: {
        newRecipe,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
