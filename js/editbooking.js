/*
document.addEventListener("DOMContentLoaded", createFormEventListener);

let updateBook;

function createFormEventListener() {
  updateBook = document.getElementById("bookForm");
  console.log(updateBook);
  updateBook.addEventListener("submit", restUpdateBooking);
}

 */

async function updateBooking(booking) {
  let header = document.getElementById("bookingFormHeader");
  let updateButton = document.getElementById("saveButton");
  let customerName = document.getElementById("customerName");
  let customerEmail = document.getElementById("customerEmail");
  let customerPhone = document.getElementById("customerPhone");

  let activity = document.getElementById("activityDropDown");
  let date = document.getElementById("date");
  let time = document.getElementById("time");
  let participants = document.getElementById("nrOfParticipants");
  let instructor = document.getElementById("instructorDropDown");

  header.innerText = "Rediger booking";
  updateButton.value = "Update";
  customerName.value = booking.customer.name;
  console.log(booking.customer.name);
  customerEmail.value = booking.customer.email;
  customerPhone.value = booking.customer.phoneNumber;

  activity.value = booking.activity.name;
  date.value = booking.date;
  time.value = booking.time;
  participants.value = booking.nrOfParticipants;
  instructor.value = booking.instructor.email;

  console.log(booking);

  //const response = await restUpdateBooking(booking);
}
/*
async function restUpdateBooking(booking) {
  booking.preventDefault();

  const formData = JSON.stringify(booking);
  const url = "http://localhost:8080/booking";
  const fetchOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: "",
  };
  fetchOptions.body = formData;
  const response = await fetch(url, fetchOptions);
  if (!response) {
    console.log("something went wrong in restudatebooking");
  }
  return response;
}

 */

