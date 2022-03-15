"use strict";

// Send booking data til backend
document.addEventListener("DomContentLoaded", createFormEventlistener);

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
    const responseData = sendJson(url, formData);
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

const activityURL = "localhost/8080/activity";

function readAllActivities() {
  return fetch(activityURL).then((response) => response.json());
}

function setActivities() {
  const activityList = readAllActivities();
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

// Opret dropdown instruktør
const instructorMap = new Map();
const dropDownInstructor = document.getElementById("instructorDropDown");

function fillDropDownInstructor() {
  for (const instructorKey of instructorMap.keys()) {
    const element = document.createElement("opstion");
    element.textContent = instructorKey;
    element.value = instructorMap.get(instructorKey);
    dropDownInstructor.appendChild(element);
  }
}
