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
  for (const instructorKey of instructorMap.keys()) {
    const element = document.createElement("option");
    element.textContent = instructorMap.get(instructorKey).name;
    element.value = instructorMap.get(instructorKey).email;
    dropDownInstructor.appendChild(element);
  }
}

setInstructors();
