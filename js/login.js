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
  const loginInfo = Object.fromEntries(formData.entries());
  out(loginInfo);

  const jsonDataString = JSON.stringify(loginInfo);

  const fetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: jsonDataString,
  };
  //window.location("/index");

  const response = await fetch(url, fetchOptions);

  if (!response) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  } else {
    // Put the object into storage
    localStorage.setItem("login", JSON.stringify(loginInfo));
    window.location.replace("index.html");

    //MIS
    // Retrieve the object from storage
    /*let retrievedObject = localStorage.getItem('login');

    console.log('retrievedObject: ', JSON.parse(retrievedObject));
    console.log('retrievedObject: ', JSON.parse(retrievedObject).email);*/
  }

  return response.json();
}
