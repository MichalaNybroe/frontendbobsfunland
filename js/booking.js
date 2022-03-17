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
  const activity = form.activity.value;
  console.log(activity);
  console.log(form);
  console.log(url);

  try {
    const formData = new FormData(form);
    console.log(formData);
    const responseData = await sendJson(url, formData);
  } catch (err) {
    alert("Noget gik galt ved bookning");
  }
}

async function sendJson(url, formData) {
  console.log(formData.entries());
  const plainFormData = Object.fromEntries(formData.entries());
  const activity = plainFormData.activity.value;
  const formDataJson = JSON.stringify(plainFormData);

  const fetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: formDataJson,
  };

  const response = await fetch(url, fetchOptions);
  if (!response) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}

// Opret dropdown aktiviteter
const activityMap = new Map();
const dropDownActivity = document.getElementById("activityDropDown");

const activityURL = "http://localhost:8080/activity";

function readAllActivities() {
  return fetch(activityURL).then((response) => response.json());
}

async function setActivities() {
  const activityList = await readAllActivities();
  await activityList.forEach((activity) => {
    activityMap.set(activity.name, activity);
  });
  fillDropDownActivity();
}

function fillDropDownActivity() {
  for (const activityKey of activityMap.keys()) {
    const option = document.createElement("option");
    option.textContent = activityKey;
    option.value = activityMap.get(activityKey);
    dropDownActivity.appendChild(option);
  }
}

// Opret dropdown instruktør
const instructorMap = new Map();
const dropDownInstructor = document.getElementById("instructorDropDown");

const instructorURL = "http://localhost:8080/instructor";

function readAllInstructors() {
  return fetch(instructorURL).then((response) => response.json());
}

async function setInstructors() {
  const instructorList = await readAllInstructors();
  await instructorList.forEach((instructor, index) => {
    instructorMap.set(instructor.email, instructor);
  });

  fillDropDownInstructor();
}

function fillDropDownInstructor() {
  console.log(instructorMap);
  for (const instructorKey of instructorMap.keys()) {
    const element = document.createElement("option");
    element.textContent = instructorMap.get(instructorKey).name;
    element.value = instructorMap.get(instructorKey);
    dropDownInstructor.appendChild(element);
  }
}

setActivities();
setInstructors();

// Display bookings
console.log("in display bookings");

function createTableFromMap() {
  bookingMap.forEach((booking) => addRow(booking));
}

function addRow(booking) {
  const rowCount = bookingTable.rows.length;
  let columnCount = 0;

  let row = bookingTable.insertRow(rowCount);
  let cell = row.insertCell(columnCount++);
}
