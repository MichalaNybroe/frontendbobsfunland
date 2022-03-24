"use strict";

// Søg bookings
const searchURL = "http://localhost:8080/search";
const searchInput = document.getElementById("searchInput");
const searchSubmit = document.getElementById("searchButton");

async function fetchBookings() {
  const fetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: searchInput.value,
  };

  return await fetch(searchURL, fetchOptions).then((response) =>
    response.json()
  );
}

async function sendSearch() {
  emptyTable();

  const bookings = fetchBookings();

  if (!bookings) {
    const errorMessage = await bookings.text();
    throw new Error(errorMessage);
  }
  return bookings;
}

function addSearchRow(booking, table) {
  const rowSearchCount = searchBookingTable.rows.length;
  let columnSearchCount = 0;

  let rowS = searchBookingTable.insertRow(rowSearchCount);
  rowS.setAttribute("class", "searchTableRow");
  let cellS = rowS.insertCell(columnSearchCount++);
  cellS.innerText = booking.customer.name;

  cellS = rowS.insertCell(columnSearchCount++);
  cellS.innerText = booking.customer.email;

  cellS = rowS.insertCell(columnSearchCount++);
  cellS.innerText = booking.customer.phoneNumber;

  cellS = rowS.insertCell(columnSearchCount++);
  cellS.innerText = booking.orderNumber;

  cellS = rowS.insertCell(columnSearchCount++);
  cellS.innerText = booking.date;

  cellS = rowS.insertCell(columnSearchCount++);
  cellS.innerText = booking.time;

  cellS = rowS.insertCell(columnSearchCount++);
  cellS.innerText = booking.activity.name;

  cellS = rowS.insertCell(columnSearchCount++);
  cellS.innerText = booking.nrOfParticipants;

  cellS = rowS.insertCell(columnSearchCount++);
  cellS.innerText = booking.instructor.email;

  cellS = rowS.insertCell(columnSearchCount++);
  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.setAttribute("value", "Slet");
  deleteButton.setAttribute("class", "deleteButton");
  deleteButton.onclick = function () {
    deleteSearchBooking(booking, rowSearchCount, rowS);
  };
  cellS.appendChild(deleteButton);

  cellS = rowS.insertCell(columnSearchCount++);
  const editButton = document.createElement("input");
  editButton.type = "button";
  editButton.setAttribute("value", "Rediger");
  editButton.setAttribute("class", "editButton");
  editButton.onclick = function () {
    window.location.replace("editBooking.html");
    updateBooking(booking, rowSearchCount, rowS);
  };
  cellS.appendChild(editButton);
}

function emptyTable() {
  document.querySelectorAll(".searchTableRow").forEach((e) => e.remove());
}

async function deleteSearchBooking(booking, rowSearchCount, rowS) {
  const response = await restSearchDeleteBooking(booking);
  if (response) {
    searchBookingTable.deleteRow(rowS.rowIndex);
    window.location.reload();
  } else {
    console.log("Something went wrong in deleteBooking");
  }
}

async function restSearchDeleteBooking(booking) {
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
