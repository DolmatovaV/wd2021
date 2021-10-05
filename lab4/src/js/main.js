import "../styles/style.scss"

const wethURL = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=cf2635019cb050fcf347d9ab961e9ea4"
const placeURL = "data.json"
let res1;


getWeathBut.onclick=getWeather


function getWeather(){
  fetch(wethURL)  
  .then(response => response.json())
  .then(r=>{
      res1=r;
      textHTML(res1)
      
  })
  .catch(err => console.log(err))
  const textHTML = (response) => {
    document.getElementById('weather-info').innerHTML='';
    document.getElementById('weather-info').innerHTML+=`
    <div class="weather-info-div">
            <h3></h3>
            <p class="weather-row"> </p> <span id="weather-city"> </span>
            <p class="weather-row"><span class="left-column">Status </span><span class="right-column" id="weather-status">${response.weather[0].main} , ${response.weather[0].description} </span> </p>
            <p class="weather-row"><span class="left-column">In air now </span><span class="right-column" id="in-air"> ${Math.round(response.main.temp - 273)}</span></p> 
            <div id="min-max-temp">
                <p class="weather-row"> <span class="left-column">Minimum temperature </span><span class="right-column" id="min-temp"> ${Math.round(response.main.temp_min - 273)}</span></p>
                <p class="weather-row"><span class="left-column">Maximum temperature </span><span class="right-column" id="max-temp"> ${Math.round(response.main.temp_max - 273)}</span>  </p>             
            </div>
            <p class="weather-row"> <span class="left-column">Feels like </span><span class="right-column" id="feels-like"> ${Math.round(response.main.feels_like - 273)}</span></p>
            <p class="weather-row"> <span class="left-column">Pressure </span><span class="right-column" id="pressure"> ${response.main.pressure}</span></p>
            <p class="weather-row"><span class="left-column">Humidity </span><span class="right-column" id="humidity"> ${response.main.humidity}</span></p>
            <p class="weather-row"><span class="left-column">Speed of wind </span><span class="right-column" id="wind-speed"> ${response.wind.speed}</span></p>
            <p class="weather-row"> <span class="left-column" id="sunrise-at"> </span> <span id="sunrise-time"> </span> </p>
            <p class="weather-row"> <span class="left-column" id="sunset-at"> </span> <span id="sunset-time"> </span> </p>        
        
      </div>`
  }


//---------------------------------------second source----------------------------------------------------

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
    body: JSON.stringify({
      title: 'Sunrise at',
      body: '6:58 a.m',
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json())
  .then(r=>{
      res1=r;
      textSunriseHTML(res1)
      
  })
  .catch(err => console.log(err))
  const textSunriseHTML = (response) =>{
    console.log('hello')
    document.getElementById('sunrise-at').textContent =`${response.title}`;
    document.getElementById('sunrise-time').textContent =`${response.body}`;
  }

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
    body: JSON.stringify({
      title: 'Sunset at',
      body: '18:35 p.m',
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then(response => response.json())
  .then(r=>{
      res1=r;
      textSunsetHTML(res1)
        
  })
  .catch(err => console.log(err))
  const textSunsetHTML = (response) =>{
    console.log('hello')
    document.getElementById('sunset-at').textContent =`${response.title}`;
    document.getElementById('sunset-time').textContent =`${response.body}`;
  }
}


fetch(placeURL)  
  .then(response => response.json())
  .then(r=>{
      res1=r;
      textPlaceHTML(res1)
      
  })
  .catch(err => console.log(err))
  const textPlaceHTML = (response) => {
    document.getElementById('gallery').innerHTML='';
    document.getElementById('gallery').innerHTML+=`
    <div class="place-box">
      <p>${response[0].title} </p>
      <img class="place-photo" src="${response[0].img}" alt="">
    </div>
    <div class="place-box">
      <p>${response[1].title} </p>
      <img class="place-photo" src="${response[1].img}" alt="">
    </div>
    `
  }

