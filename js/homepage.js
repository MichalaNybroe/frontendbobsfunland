//Dropdown med aktiviteter
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

//information om aktiviteter

async function getInformationActivity() {
  let activity;

  function EventlisteneActivity() {
    activity = document.getElementById("dropdownActivity");
    console.log(activity);
    activity.addEventListener("unclick", chooseActivity);
    o;
  }

  async function selectedActivity(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const url = form.action;
    console.log(form);
    console.log(url);

    addEventListener(dropDownActivity);
  }
}
