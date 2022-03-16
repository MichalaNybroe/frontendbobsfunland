const out = function (str) {
  console.log(str);
};

document.addEventListener("DOMContentLoaded", creatLoginForm);

let loginForm;

function createLoginForm() {
  loginForm = document.querySelector("#loginForm");
  loginForm.addEventListener("submit", handleLogin);
}

async function handleLogin(event) {
  event.preventDefault();
  //
  const form = event.currentTarget;
  const url = event.action;

  try {
    const formData = new FormData(form);
    const responseData = await postLogin(url, formData);

    out(responseData);
  } catch (err) {
    out(err.message);
  }
}

async function postLogin(url, formData) {
  //HVAD ER DET??
  const plainFormData = Object.fromEntries(formData.entries());

  const jsonDataString = JSON.stringify(plainFormData);

  const fetchOptions = {
    method: "POST",
    headers: { "Constent-Type": "application/json" },
    body: jsonDataString,
  };

  const response = await fetch(url, fetchOptions);

  if (!response) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}
