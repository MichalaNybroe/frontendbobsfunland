async function updateBooking(booking, rowCount, row) {

  let customerName = document.getElementById("customerName");
  let customerEmail = document.getElementById("customerEmail");
  let customerPhone = document.getElementById("customerPhone");

  let activity = document.getElementById("activityDropDown");
  let date = document.getElementById("date");
  let time = document.getElementById("time");
  let participants = document.getElementById("participants");
  let instructor = document.getElementById("instructorDropDown");

  customerName.innerText = booking.customerName;
  customerEmail.innerText = booking.customerEmail;
  customerPhone.innerText = booking.customerPhone;

  activity.innerText = booking.activity;
  date.innerText = booking.date;
  time.innerText = booking.time;
  participants.innerText = booking.participants;
  instructor.innerText = booking.instructor;

  console.log(booking);

  const response = await restUpdateBooking(booking);
}

async function restUpdateBooking(booking){


}
