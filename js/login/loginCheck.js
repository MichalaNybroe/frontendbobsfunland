function loginCheck() {
  const loginStorage = JSON.parse(localStorage.getItem("login"));

  const searchTableBtn = document.querySelectorAll(".adminAccessTable");
  const editBtn = document.querySelectorAll(".editButton");
  const deleteBtn = document.querySelectorAll(".deleteButton");
  const bookingForm = document.querySelector("#booking");

  if (loginStorage) {
    if (loginStorage.access.accessLevel === 1) {
      searchTableBtn.forEach((t) => (t.style.display = "table-cell"));
      editBtn.forEach((t) => (t.style.display = "block"));
      deleteBtn.forEach((t) => (t.style.display = "block"));
      bookingForm.style.display = "block";
    } else {
      searchTableBtn.forEach((t) => (t.style.display = "none"));
      editBtn.forEach((t) => (t.style.display = "none"));
      deleteBtn.forEach((t) => (t.style.display = "none"));
    }
  } else {
    window.location.replace("login.html");
  }
}
