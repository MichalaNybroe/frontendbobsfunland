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
