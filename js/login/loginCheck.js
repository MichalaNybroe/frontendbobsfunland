function loginCheck() {
  const loginStorage = JSON.parse(localStorage.getItem("login"));

  const searchTableBtn = document.querySelectorAll(".adminAccessTable");
  const editBtn = document.querySelectorAll(".editButton");
  const deleteBtn = document.querySelectorAll(".deleteButton");

  if (loginStorage) {
    console.log("logged in");
    if (loginStorage.access.accessLevel === 1) {
      console.log("You are admin!")
      searchTableBtn.forEach(t => t.style.display = "table-cell")
      editBtn.forEach(t => t.style.display = "block");
      deleteBtn.forEach(t => t.style.display = "block");
      console.log("Done")
    } else {
      console.log("You´re not admin!")
      searchTableBtn.forEach(t => t.style.display = "none")
      editBtn.forEach(t => t.style.display = "none");
      deleteBtn.forEach(t => t.style.display = "none");
    }

  } else {
    window.location.replace("login.html");
  }
}
