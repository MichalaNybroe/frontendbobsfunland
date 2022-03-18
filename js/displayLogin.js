const loginHeader = document.querySelector("#loginHeader");

loginHeader.addEventListener("click", displayHiddenHeaderTags);

function displayHiddenHeaderTags() {
  let loginHeaderText = loginHeader.textContent.toLowerCase();
  if (loginHeaderText === "login") {
    document.querySelector("#bookingHeader").style.display = "inline-block";
    loginHeader.textContent = "logout";
  } else {
    document.querySelector("#bookingHeader").style.display = "none";
    loginHeader.textContent = "login";
  }
}
