"use strict";

// Søg bookings
const searchInput = document.getElementById("searchInput");
const searchSubmit = document.getElementById("searchButton");

searchSubmit.addEventListener("click", sendSearch);

async function sendSearch(event) {
  event.preventDefault();

  const fetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: searchInput.value,
  };

  const searchURL = "http://localhost:8080/search";

  const bookings = await fetch(searchURL, fetchOptions).then((response) =>
    response.json()
  );

  if (!bookings) {
    const errorMessage = await bookings.text();
    throw new Error(errorMessage);
  }

  const bookingSearchMap = new Map();

  await bookings.forEach((booking) => {
    bookingSearchMap.set(booking.orderNumber, booking);
  });
  bookingSearchMap.forEach((booking) => addRow(booking));
}

const searchBookingTable = document.getElementById("searchTableBookings");
function addRow(booking) {
  const rowCount = searchBookingTable.rows.length;
  let columnCount = 0;
  let row = searchBookingTable.insertRow(rowCount);
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
}
