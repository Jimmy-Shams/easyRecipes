import session from "../models/sessionModel.js";

let demoData = {
  sessionID: "231",
  messages: [{ senderName: "mina", senderID: "minsdas", timeSent: 12324 }],
  active: true,
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

export async function getSession(req, res) {
  console.log("Read request made at session.");

  //filter
  let queryData = { ...req.query };

  let queryString = JSON.stringify(queryData);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (match) => `$${match}`
  );

  queryData = JSON.parse(queryString);
  let query = session.find({});

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
      items = await session.findById(req.params.id);
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

export async function deleteSession(req, res) {
  console.log("delete request made at recipeData.", req.params.id);
  try {
    await session.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "read success",
      results: "deleted" + req.params.id,
    });
  } catch (error) {
    console.log("error", error);
  }
}

export async function updateSession(req, res) {
  console.log("Update request made at recipeData.");
  console.log(req.params.id, req.body);

  try {
    let items;
    if (req.params.id) {
      items = await session.findByIdAndUpdate(req.params.id, req.body, {
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

export async function uploadSession(req, res) {
  console.log("Upload request made at recipeData.");

  console.log(req.params.id, req.body);

  try {
    const newsession = await session.create(req.body);

    res.status(201).json({
      status: "creation success",
      data: {
        newsession,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
