let searchInput = document.getElementById("search");
let resultInfo = document.getElementById("result");
let currentLocation = "cairo"
function showData(data) {
  let dataContainer = "";
  let forecast = data.forecast.forecastday;

  for (let i = 0; i < forecast.length; i++) {
    let date = new Date(forecast[i].date);
    let weekDay = date.toLocaleDateString("en-EG", {
      weekday: "long",
    });
    let shortDate = date.toLocaleDateString("en-EG", {
      day: "numeric",
      month: "long",
    });

    dataContainer += `<div class="col-12 col-lg-4">
              <div class="card">
                <div
                  class="card-header d-flex justify-content-between align-items-center"
                >
                  <p>${data.location.name}</p>
                  <p>${weekDay}</p>
                  <p>${shortDate}</p>
                </div>
                <div class="card-body">
                  <h5 class="card-title">${forecast[i].day.avgtemp_c}<sup>o</sup></h5>
                  <div class="card-text"><img  class=" w-25 "  src="https:${forecast[i].day.condition.icon}" alt=""  >${forecast[i].day.condition.text}</div>
                </div>
                <div
                  class="card-footer d-flex justify-content-between align-items-center">
                  <span><i class="fa-solid fa-umbrella"></i> ${forecast[i].day.daily_chance_of_rain}</span
                  ><span><i class="fa-solid fa-wind"></i> ${forecast[i].day.maxwind_kph}</span
                  ><span><i class="fa-solid fa-compass"></i> ${forecast[i].day.avghumidity}</span>
                </div>
              </div>
            </div>`;
  }

  resultInfo.innerHTML = dataContainer;
}

searchInput.addEventListener("keyup", async function () {

   if (searchInput.value.length > 2 ) {
     let data = await getData(searchInput.value);
  showData(data);
   } else{
    resultInfo.innerHTML = ""
   }

 
});

async function getData(inputValue) {
  let result = await fetch(
    "https://api.weatherapi.com/v1/forecast.json?key=2b912989c3a0410ba92204815241406&days=3&q=" +
      inputValue
  );

  let finalResult = await result.json();
  return finalResult;
}


 async function onLoad(currentLocation){

    let data = await getData(currentLocation);
    showData(data);
    

}

onLoad(currentLocation);









