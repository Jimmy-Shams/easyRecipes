import supports from "../models/supportModel.js";

let demoData = {
  supportName: "",
  supportRealName: "",
  supportEmail: "",
  supportPass: "",
  supportMobileNo: "",
  supportAddress: "",
  supportGender: "",
  supportBirthdate: "",
  supportID: "",
  supportActiveStatus: false,
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

export async function getSupport(req, res) {
  console.log("Read request made at support.");

  //filter
  let queryData = { ...req.query };

  let queryString = JSON.stringify(queryData);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (match) => `$${match}`
  );

  queryData = JSON.parse(queryString);
  let query = supports.find({});

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
      items = await supports.findById(req.params.id);
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

export async function deleteSupport(req, res) {
  console.log("delete request made at recipeData.", req.params.id);
  try {
    await supports.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "read success",
      results: "deleted" + req.params.id,
    });
  } catch (error) {
    console.log("error", error);
  }
}

export async function updateSupport(req, res) {
  console.log("Update request made at recipeData.");
  console.log(req.params.id, req.body);

  try {
    let items;
    if (req.params.id) {
      items = await supports.findByIdAndUpdate(req.params.id, req.body, {
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

export async function uploadSupport(req, res) {
  console.log("Upload request made at recipeData.");

  console.log(req.params.id, req.body);

  try {
    const newsupport = await supports.create(req.body);

    res.status(201).json({
      status: "creation success",
      data: {
        newsupport,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
