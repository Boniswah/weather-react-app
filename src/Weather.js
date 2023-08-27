import React, {useState} from "react";
import axios from "axios";
import "./Weather.css"; 

export default function Weather() {
  const [ready, setReady] = useState(false);
  const [temperature, setTemperature] = useState(null);
function handleResponse(response){
  console.log(response.data);
  setTemperature (response.data.main.temp);
  setReady(true);

}

if (ready){
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
        <h1>Pretoria</h1>
        <ul>
          <li>Friday 08:00</li>
          <li>Sunny</li>
        </ul>
        <div className="row mt-3">
          <div className="col-6">
            <div className="d-flex">
              <img
                src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
                alt="Sunny"
              />
              <div className="float-left">
                <span className="temperature">{temperature}</span>
                <span className="unit">°C</span>
              </div>
            </div>
          </div>
          <div className="col-6">
            <ul>
              <li>Precipitation: 0%</li>
              <li>Humidity: 10%</li>
              <li>Wind: 21km/h</li>
            </ul>
          </div>
        </div>
      </div>
    );

} else{
  const apiKey = "a5acb752426cd8188485c35694980e3a";
  let city = "Pretoria";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Pretoria&key=a5acb752426cd8188485c35694980e3a&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  
    return "Loading...";

}

    
}