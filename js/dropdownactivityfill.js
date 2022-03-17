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

setActivities();
