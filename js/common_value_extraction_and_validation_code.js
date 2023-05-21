function extractAndReturnValues(inputs) {
  let inputArray = {};
  let contextData;
  console.log(inputs.length);

  for (let i = 0; i < inputs.length; i++) {
    let fieldName = "";

    if (inputs[i].getAttribute("type") !== "radio") {
      fieldName = inputs[i].name;
      // console.log(fieldName);

      contextData = inputs[i].value;
      inputArray[`${fieldName}`] = contextData;
      continue;
    }

    if (inputs[i].checked) {
      fieldName = inputs[i].getAttribute("name");
      contextData = inputs[i].value;
      inputArray[`${fieldName}`] = contextData;
    }
  }

  return inputArray;
}

function validateInputs(inputs, case_0, case_1, case_2) {
  // console.log(inputs);

  for (const input in inputs) {
    console.log(inputs[input]);
    if (inputs[input] === "") return "Can't be empty!";
  }

  if (inputs.userMobileNo) {
    if (!inputs.userMobileNo.match(/^\d{11}$/)) {
      return "Mobile nunmber not correct!";
    }
  }

  if (case_0) {
    if (!case_0[0]()) {
      return case_0[1];
    }
  }

  if (case_1) {
    if (!case_1[0]()) {
      return case_0[1];
    }
  }

  if (case_2) {
    if (!case_2[0]()) {
      return case_0[1];
    }
  }

  if (inputs.userPass !== inputs.reenter_password && inputs.reenter_password) {
    return "Password doesn't match!";
  }

  delete inputs.reenter_password;
  return "pass";
}
