import users from "../models/userModel.js";

let demoData = {
  userName: "main",
  userRealName: "nils",
  userEmail: "lsampercot@gmail.com",
  userID: "34112324",
  userPass: "askdji",
  userMobileNo: "01680793142",
  userAddress: "bangladesh",
  userGender: "masdhs",
  userCreditInfo: "34-32-442",
  userCart: [],
  userHistory: [],
  userClickedTags: [],
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

export async function getUser(req, res) {
  console.log("Read request made at user.");

  //filter
  let queryData = { ...req.query };

  let queryString = JSON.stringify(queryData);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (match) => `$${match}`
  );

  queryData = JSON.parse(queryString);
  let query = users.find({});

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
      items = await users.findById(req.params.id);
    } else {
      items = await query;
      let searchContext = queryData.searchContext;

      if (searchContext?.includes("name")) {
        items = filterByToken(items, searchContext, queryData[searchContext]);
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

export async function deleteUser(req, res) {
  console.log("delete request made at recipeData.", req.params.id);
  try {
    await users.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "read success",
      results: "deleted" + req.params.id,
    });
  } catch (error) {
    console.log("error", error);
  }
}

export async function updateUser(req, res) {
  console.log("Update request made at recipeData.");
  console.log(req.params.id, req.body);

  try {
    let items;
    if (req.params.id) {
      items = await users.findByIdAndUpdate(req.params.id, req.body, {
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

export async function uploadUser(req, res) {
  console.log("Upload request made at recipeData.");

  console.log(req.params.id, req.body);

  try {
    const newUser = await users.create(req.body);

    res.status(201).json({
      status: "creation success",
      data: {
        newUser,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
