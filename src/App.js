import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const dotenv = require('dotenv').config();

class App extends Component {

  constructor(props) {
    super(props);

  };

  componentDidMount() {


    let weather = document.getElementById('weatherData');
    let city = document.getElementById('weatherCity');
    if (navigator.geolocation) { navigator.geolocation.getCurrentPosition( function(position) {
      let lat = position.coords.latitude; 
      let lon = position.coords.longitude;
      //weather.textContent = lat + " " + lon;
      let apiObject = "lat=" + lat + "&lon=" + lon;
      let Url = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&" + apiObject;
      //backup fetch call for city name
      fetch(Url).then((res) => {return res.json()}).then( (res) => {console.log(res);



      city.textContent = res.address.city;
       //let city = res.adress.city;
       // weather api call







     });

     // geoloc weather apicall 

      let apiKey = process.env.REACT_APP_OPENWEATHER_KEY;
      console.log(process.env)
      let Url2 = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + "&APPID=" + apiKey ;
      console.log(Url2);
      fetch(Url2).then((res) => { return res.json(); }).then( (res) => {console.log(res);


         weather.textContent = "weather is " + res.weather[0].main;



      }).catch( (error) => {console.log(error)})
    })};

  }


  render() {
    return (
      <div className="App">
       
       <section>
         <div id="weatherCity"></div>
         <div id="weatherData">


         </div>
       </section>
      </div>
    );
  }
}

export default App;
