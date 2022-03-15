"use strict";

// Send booking data til backend
document.addEventListener("DomContentLoaded", createFormEventlistener);

let book;
function createFormEventlistener() {
  book = document.getElementById("bookForm");
  book.addEventListener("submit", createBooking);
}

async function createBooking(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const url = form.action;

  try {
    const formData = await new FormData(form);
    sendJson(url, formData);
  } catch (err) {
    alert("Noget gik galt ved bookning");
  }
}

async function sendJson(url, formData) {
  const plainFormData = Object.fromEntries(formData.entries());

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

const activityURL = "/activity";

function readAllActivities() {
  return fetch(activityURL).then((response) => response.json());
}

async function setActivities() {
  const activityList = await readAllActivities();
  activityList.forEach((activity, index) => {
    activityMap.set(activity.name, activity);
  });
}

function fillDropDownActivity() {
  for (const activityKey of activityMap.keys()) {
    const option = document.createElement("option");
    option.textContent = activityKey;
    option.value = activityMap.get(activityKey);
    dropDownActivity.appendChild(option);
  }
}

setActivities();
fillDropDownActivity();

// Opret dropdown instruktør
const instructorMap = new Map();
const dropDownInstructor = document.getElementById("instructorDropDown");

const instructorURL = "/instructor";

function readAllInstructors() {
  return fetch(instructorURL).then((response) => response.json());
}

async function setInstructors() {
  const instructorList = await readAllInstructors();
  instructorList.forEach((instructor, index) => {
    instructorMap.set(instructor.email, instructor);
  });
}
function fillDropDownInstructor() {
  for (const instructorKey of instructorMap.keys()) {
    const element = document.createElement("option");
    element.textContent = instructorKey;
    element.value = instructorMap.get(instructorKey);
    dropDownInstructor.appendChild(element);
  }
}

setActivities();
fillDropDownInstructor();
