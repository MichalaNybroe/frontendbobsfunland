const loginHeader = document.querySelector("#loginHeader");

displayHiddenHeaderTags();

function displayHiddenHeaderTags() {
  if (localStorage.getItem("login")) {
    document.querySelector("#bookingHeader").style.display = "inline-block";
    loginHeader.textContent = "Logout";
  } else {
    document.querySelector("#bookingHeader").style.display = "none";
    loginHeader.textContent = "Login";
  }
}
