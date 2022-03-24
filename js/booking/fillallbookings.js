const url = "http://localhost:8080/booking";
const bookingMap = new Map();
const bookingTable = document.getElementById("tableBooking");

function readAllBookings() {
  return fetch(url).then((response) => response.json());
}

createTableFromMap(bookingMap, bookingTable, readAllBookings());
