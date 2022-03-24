function loginCheck() {
  const loginStorage = JSON.parse(localStorage.getItem("login"));

  if (loginStorage) {
    console.log("logged in");
  } else {
    window.location.replace("login.html");
  }
}

//remove and call the function

//out commited so its not working
//loginCheck();
