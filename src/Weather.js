import React, {useState} from "react";
import FormattedDate from "./FormattedDate";
import axios from "axios";
import "./Weather.css"; 

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ready: false});

function handleResponse(response){
  console.log(response.data);
  setWeatherData({
    ready: true,
    temperature: response.data.main.temp,
    humidity: response.data.main.humidity,
    date: new Date(response.data.dt*1000),
    description: response.data.weather[0].description,
    iconUrl: "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
    wind: response.data.speed,
    city: response.data.name,
  });
setReady(true);

}

if (weatherData.ready) {
   return (
     <div className="weather">
       <form>
         <div className="row">
           <div className="col-9">
             <input
               type="search"
               placeholder="Enter a city..."
               className="form-control"
               autoFocus="on"
             />
           </div>
           <div className="col-3">
             <input
               type="submit"
               value="Search"
               className="btn btn-primary w-100"
             />
           </div>
         </div>
       </form>
       <h1>{weatherData.city}</h1>
       <ul>
         <FormattedDate date={weatherData.date} />
         <li className="text-capitalize">{weatherData.description}</li>
       </ul>
       <div className="row mt-3">
         <div className="col-6">
           <div className="d-flex">
             <img
               src= {weatherData.iconUrl}
               alt={weatherData.description}
             />
             <div className="float-left">
               <span className="temperature">
                 {Math.round(weatherData.temperature)}
               </span>
               <span className="unit">°C</span>
             </div>
           </div>
         </div>
         <div className="col-6">
           <ul>
             <li>Humidity:{weatherData.humidity} %</li>
             <li>Wind: {weatherData.wind}km/h</li>
           </ul>
         </div>
       </div>
     </div>
   );

} else{
  const apiKey = "0a521eaf234a3a56f45252fac3c737ad";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${props.defaultCity}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(handleResponse);

  return "Loading...";
 }
} 
  
