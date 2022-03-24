const out = function (str) {
  console.log(str);
};

//Listening to the entire page
document.addEventListener("DOMContentLoaded", createLoginForm);

let loginForm;

function createLoginForm() {
  //Getting connection to the html form
  loginForm = document.querySelector("#loginForm");
  //Jumping into the function handleLogin, when login button is clicked
  loginForm.addEventListener("submit", handleLogin);
}

async function handleLogin(event) {
  //Preventing the function from automaticly sending everything to the backend
  event.preventDefault();

  //
  const form = event.currentTarget;
  const url = form.action;

  try {
    const formData = new FormData(form);
    await postLogin(url, formData);
  } catch (err) {
    out(err.message);
  }
}

async function postLogin(url, formData) {
  const loginInfo = Object.fromEntries(formData.entries());

  const jsonDataString = JSON.stringify(loginInfo);

  const fetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: jsonDataString,
  };

  //lav validering på om det der kommer tilbage er en rigtigt
  await fetch(url, fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("login", JSON.stringify(data));
    });
  // Put the object into storage above

  window.location.replace("index.html");

  //MIS
  // Retrieve the object from storage
  /*let retrievedObject = localStorage.getItem('login');

  console.log('retrievedObject: ', JSON.parse(retrievedObject));
  console.log('retrievedObject: ', JSON.parse(retrievedObject).email);*/
}
