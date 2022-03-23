const loginHeader = document.querySelector("#loginHeader");

function displayHiddenHeaderTags() {

  let retrievedObject = JSON.parse(localStorage.getItem("login"));

  if (retrievedObject !== null) {
    document.querySelector("#bookingHeader").style.display = "inline-block";
    loginHeader.textContent = "Logout";

    loginHeader.addEventListener("click",
      () => localStorage.removeItem("login")
    );
  } else {
    document.querySelector("#bookingHeader").style.display = "none";
    loginHeader.textContent = "Login";
  }
}

displayHiddenHeaderTags();
