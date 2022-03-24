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
