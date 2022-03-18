const loginHeader = document.querySelector("#loginHeader");

displayHiddenHeaderTags();

function displayHiddenHeaderTags() {
  let retrievedObject = JSON.parse(localStorage.getItem("login"));
  console.log(retrievedObject);
  if (retrievedObject !== null) {
    document.querySelector("#bookingHeader").style.display = "inline-block";
    loginHeader.textContent = "Logout";
    loginHeader.addEventListener("click", () =>
      localStorage.removeItem("login")
    );
    console.log("1");
  } else {
    document.querySelector("#bookingHeader").style.display = "none";
    loginHeader.textContent = "Login";
    console.log("2");
  }
}
