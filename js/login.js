const out = function (str) {
  console.log(str);
};

document.addEventListener("DOMContentLoaded", createLoginForm);

let loginForm;

function createLoginForm() {
  loginForm = document.querySelector("#loginForm");
  loginForm.addEventListener("submit", handleLogin);
  out(loginForm);
}

async function handleLogin(event) {
  event.preventDefault();
  //
  const form = event.currentTarget;
  const url = form.action;
  out(form);
  out(url);
  try {
    //const formData = new FormData(form);
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const formData = {email: email, password:password};
    const responseData = await postLogin(url, formData);

    out(responseData);
  } catch (err) {
    out(err.message);
  }
}

async function postLogin(url, formData) {
  //HVAD ER DET??
  //const plainFormData = Object.fromEntries(formData.entries());

  const jsonDataString = JSON.stringify(formData);
  out("this is the json string: " + jsonDataString)
  const fetchOptions = {
    method: "POST",
    headers: { 'Accept': 'application/json', "Content-Type": "application/json" },
    body: jsonDataString,
  };

  const response = await fetch(url, fetchOptions);

  out(response);

  if (!response) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}

/*
async function validate(){
  //What we get from the user
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch(email, password);
  out(response);
  const dbEmail = null;
  const dbPassword = null;

  if(email == dbEmail && password == dbPassword){
    alert("Login successful")
    window.location = "index.html";
    return false;
  } else {
    out("you didn't login")
  window.location = "login.html";
  return false;
  }
}

 */
