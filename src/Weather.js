import React, {useState} from "react";
import WeatherInfo from "./Weatherinfo";
import axios from "axios";
import "./Weather.css"; 

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ready: false});
  const [city, setCity]= useState(props.defaultCity);

function handleResponse(response){
  console.log(response.data);
  setWeatherData({
    ready: true,
    temperature: response.data.main.temp,
    humidity: response.data.main.humidity,
    date: new Date(response.data.dt * 1000),
    description: response.data.weather[0].description,
    icon:response.data.weather[0].icon,
    wind: response.data.speed,
    city: response.data.name,
  });
}

function search(){
  const apiKey = "0a521eaf234a3a56f45252fac3c737ad";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(handleResponse);


}

function handleSubmit(event){
  event.preventDefault();
  search();
  //search for a city
}

function handleCityChange(event){
setCity(event.target.value);

}

if (weatherData.ready) {
   return (
     <div className="weather">
       <form onSubmit={handleSubmit}>
         <div className="row">
           <div className="col-9">
             <input
               type="search"
               placeholder="Enter a city..."
               className="form-control"
               autoFocus="on"
               onChange={handleCityChange}
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
       <WeatherInfo data={weatherData}/>
      
     </div>
   );

} else{
  search();
  
  return "Loading...";
 }
} 
  
