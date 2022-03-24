const bookingSearchMap = new Map();
const searchBookingTable = document.getElementById("searchTableBookings");

searchSubmit.addEventListener("click", searchMap);

function searchMap() {
  createTableFromMap(bookingSearchMap, searchBookingTable, sendSearch());
}
