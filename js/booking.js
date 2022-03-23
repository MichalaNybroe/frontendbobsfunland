"use strict";

// Send booking data til backend
document.addEventListener("DOMContentLoaded", createFormEventListener);

let book;

function createFormEventListener() {
  book = document.getElementById("bookForm");
  console.log(book);
  book.addEventListener("submit", createBooking);
}

async function createBooking(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const url = form.action;

  try {
    const activityDropDown = document.querySelector("#activityDropDown");
    const activityValue =
      activityDropDown.options[activityDropDown.selectedIndex].text;

    const instructorDropDown = document.querySelector("#instructorDropDown");
    const instructorValue =
      instructorDropDown.options[instructorDropDown.selectedIndex].value;

    const formData = new FormData(form);

    const plainFormData = Object.fromEntries(formData.entries());
    plainFormData.instructor = { email: instructorValue };
    plainFormData.activity = { name: activityValue };
    plainFormData.customer = {
      name: plainFormData.customerName,
      email: plainFormData.customerEmail,
      phoneNumber: plainFormData.customerPhone,
    };

    await sendJson(url, plainFormData);
  } catch (err) {
    alert("Noget gik galt ved bookning");
  }
}

async function sendJson(url, data) {
  const formDataJson = JSON.stringify(data);

  const fetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "",
  };

  fetchOptions.body = formDataJson;

  const response = await fetch(url, fetchOptions);
  if (!response) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}

// Display bookings
const url = "http://localhost:8080/booking";
const bookingMap = new Map();

function readAllBookings() {
  return fetch(url).then((response) => response.json());
}

async function createBookingMap() {
  const list = await readAllBookings();
  list.forEach((booking, index) => {
    //Dette er udhentet fra vores backend - hvorfor booking.name (det er hvad den hedder i model og i db)
    bookingMap.set(booking.orderNumber, booking);
  });
  console.log(list);
}

async function createTableFromMap() {
  await createBookingMap();
  bookingMap.forEach((booking) => addRow(booking));
}

const bookingTable = document.getElementById("tableBooking");
function addRow(booking) {
  const rowCount = bookingTable.rows.length;
  let columnCount = 0;
  let row = bookingTable.insertRow(rowCount);
  let cell = row.insertCell(columnCount++);

  cell.innerText = booking.customer.name;

  cell = row.insertCell(columnCount++);
  cell.innerText = booking.customer.email;

  cell = row.insertCell(columnCount++);
  cell.innerText = booking.customer.phoneNumber;

  cell = row.insertCell(columnCount++);
  cell.innerText = booking.orderNumber;

  cell = row.insertCell(columnCount++);
  cell.innerText = booking.date;

  cell = row.insertCell(columnCount++);
  cell.innerText = booking.time;

  cell = row.insertCell(columnCount++);
  cell.innerText = booking.activity.name;

  cell = row.insertCell(columnCount++);
  cell.innerText = booking.nrOfParticipants;

  cell = row.insertCell(columnCount++);
  cell.innerText = booking.instructor.email;

  cell = row.insertCell(columnCount++);
  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.setAttribute("value", "Slet");
  deleteButton.setAttribute("class", "deleteButton");
  deleteButton.onclick = function () {
    deleteBooking(booking, rowCount, row);
  };
  cell.appendChild(deleteButton);

  cell = row.insertCell(columnCount++);
  const editButton = document.createElement("input");
  editButton.type = "button";
  editButton.setAttribute("value", "Rediger");
  editButton.setAttribute("class", "editButton");
  editButton.onclick = function () {
    updateBooking(booking);
  };
  cell.appendChild(editButton);
}

async function deleteBooking(booking, rowCount, row) {
  const response = await restDeleteBooking(booking);
  if (response) {
    bookingTable.deleteRow(row.rowIndex);
  } else {
    console.log("Something went wrong in deleteBooking");
  }
}

async function restDeleteBooking(booking) {
  const url = "http://localhost:8080/booking";

  const formData = JSON.stringify(booking);

  const fetchOptions = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    body: "",
  };

  fetchOptions.body = formData;

  const response = await fetch(url, fetchOptions);

  if (!response) {
    out("Something went wrong in restDeleteBooking");
  }

  return response;
}

createTableFromMap();


