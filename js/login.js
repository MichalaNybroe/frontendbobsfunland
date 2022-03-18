const out = function (str) {
  console.log(str);
};

//Listening to the entire page
document.addEventListener("DOMContentLoaded", createLoginForm);

let loginForm;

function createLoginForm() {
  out("Jer sætter nu login form");
  //Getting connection to the html form
  loginForm = document.querySelector("#loginForm");
  out(loginForm);
  //Jumping into the function handleLogin, when login button is clicked
  loginForm.addEventListener("submit", handleLogin);
}

async function handleLogin(event) {
  out("Jeg er i handle login");
  //Preventing the function from automaticly sending everything to the backend
  event.preventDefault();

  //
  const form = event.currentTarget;
  const url = form.action;
  out(form);
  out(url);

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
  out("xxxxx");
  out(plainFormData);

  const jsonDataString = JSON.stringify(plainFormData);
  out(jsonDataString);

  const fetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: jsonDataString,
  };

  //set local storage
  const localStorage = window.localStorage;
  // in
  localStorage.setItem();
  out("hallo");
  out(localStorage);

  //redirecting to homepage - virker ikke
  window.location("/index");

  out(fetchOptions.body);
  const response = await fetch(url, fetchOptions);

  out(response);
  if (!response) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}
