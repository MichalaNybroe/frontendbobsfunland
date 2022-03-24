// Display bookings

async function createBookingMap(list, tableMap) {
  list.forEach((booking) => {
    tableMap.set(booking.orderNumber, booking);
  });
}

async function createTableFromMap(tableMap, table, fetchBookings) {
  await createBookingMap(await fetchBookings, tableMap);
  tableMap.forEach((booking) => addRow(booking, table));
}

function addRow(booking, table) {
  const rowCount = table.rows.length;
  let columnCount = 0;
  let row = table.insertRow(rowCount);
  let cell = row.insertCell(columnCount++);

  if (table.id === "searchTableBookings") {
    row.setAttribute("class", "searchTableRow");
  }

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
    window.location.reload();
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
