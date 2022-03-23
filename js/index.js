const activityDropDown = document.getElementById("activityDropDown");
const activityName = document.getElementById("activityName");
const activityAge = document.getElementById("age");
const activityHeight = document.getElementById("height");
const activityImage = document.getElementById("activityImage");
const activityInfo = document.getElementById("activityInformation");

const urlReadActivityByName = "http://localhost:8080/activity/";
const map = new Map();

function readActivity() {
  const choice = activityDropDown.options[activityDropDown.selectedIndex].text;

  const url = urlReadActivityByName + choice;
  return fetch(url).then((response) => response.json());
}

async function displayActivity() {
  const activity = await readActivity();

  activityName.innerText = activity.name;
  activityInfo.innerText = activity.info;

  const age = activity.age;
  if (age === 0) {
    activityAge.innerText = "Alder: ingen begrænsning";
  } else {
    activityAge.innerText = "Alder: " + activity.age;
  }

  const height = activity.height;
  if (height === 0) {
    activityHeight.innerText = "Højde: ingen begrænsning";
  } else {
    activityHeight.innerText = "Højde: " + activity.height;
  }
}
// Senere brug af dynamisk ændring af billede
//eksempel kajak https://engholmene.dk/wp-content/uploads/2019/07/top-bild.png

activityDropDown.addEventListener("change", displayActivity);
