async function updateBooking(booking) {
  let header = document.getElementById("bookingFormHeader");
  let updateButton = document.getElementById("saveButton");
  let customerName = document.getElementById("customerName");
  let customerEmail = document.getElementById("customerEmail");
  let customerPhone = document.getElementById("customerPhone");
  let orderNumber = document.getElementById("orderNumber");

  let activity = document.getElementById("activityDropDown");
  let date = document.getElementById("date");
  let time = document.getElementById("time");
  let participants = document.getElementById("nrOfParticipants");
  let instructor = document.getElementById("instructorDropDown");

  header.innerText = "Rediger booking";
  updateButton.value = "Update";
  orderNumber.value = booking.orderNumber;
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
}


