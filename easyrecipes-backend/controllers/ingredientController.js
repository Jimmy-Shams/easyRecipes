import ingredients from "../models/ingredientModel.js";

let demoData = {
  ingredientName: "mula",
  ingredientImage: "mula",
  ingredientPrice: 24,
  ingredientStockQuantity: 6,
  ingredientID: "p-67",
  ingredientDetails: "dmifnsdk sgsdifd",
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

export async function getIngredient(req, res) {
  console.log("Read request made at ingredient.");

  //filter
  let queryData = { ...req.query };

  let queryString = JSON.stringify(queryData);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (match) => `$${match}`
  );

  queryData = JSON.parse(queryString);
  let query = ingredients.find({});

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
      console.log(req.params.id);

      items = await ingredients.findById(req.params.id);
    } else {
      items = await query;
      let searchContext = queryData.searchContext;

      if (searchContext?.includes("name")) {
        items = filterByToken(items, searchContext, queryData[searchContext]);
      }

      console.log(queryData);
    }
    if (items === null) {
      items = [];
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

export async function deleteIngredient(req, res) {
  console.log("delete request made at recipeData.", req.params.id);
  try {
    await ingredients.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "read success",
      results: "deleted" + req.params.id,
    });
  } catch (error) {
    console.log("error", error);
  }
}

export async function updateIngredient(req, res) {
  console.log("Update request made at recipeData.");
  console.log(req.params.id, req.body);

  try {
    let items;
    if (req.params.id) {
      items = await ingredients.findByIdAndUpdate(req.params.id, req.body, {
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

export async function uploadIngredient(req, res) {
  console.log("Upload request made at recipeData.");

  console.log(req.params.id, req.body);

  try {
    const newingredient = await ingredients.create(req.body);

    res.status(201).json({
      status: "creation success",
      data: {
        newingredient,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
