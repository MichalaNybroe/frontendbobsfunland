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

  window.location.reload();
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
