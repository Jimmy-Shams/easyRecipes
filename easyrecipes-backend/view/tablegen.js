function superTableGenerator(data) {
  let generatedHtml = `
<table>
#data
</table>`;
  // console.log(data);

  generatedHtml = generatedHtml.replace("#data", tableItems(data));
  // console.log(generatedHtml);

  return generatedHtml;
}

let tableItems = function (data) {
  let generatedTable = ``;

  //heading generation
  generatedTable += generateRows(data[0], "head", true);

  data.forEach((elm, ind) => {
    generatedTable += generateRows(elm, ind, false);
  });

  return generatedTable;
};

let generateRows = function (dataObj, ind, head) {
  let generatedRows = "";

  // console.log(dataObj);

  if (dataObj !== undefined)
    Object.entries(dataObj).map(([key, val] = entry) => {
      if (!head) {
        generatedRows += `<td class="table-desc" data-id="${dataObj._id}" data-index="${ind}">${val}</td>`;
      } else {
        generatedRows += `<th class="table-head">${key}</th>`;
      }
    });
  return `<tr>
${generatedRows}
</tr>`;
};
