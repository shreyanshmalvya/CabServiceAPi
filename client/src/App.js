import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('Berlin');
  const [origins, setOrigins] = useState('');
  const [destinations, setDestinations] = useState('');
  const [vehicleType, setVehicleType] = useState('Luxury');

  console.log(city);
  console.log(origins);
  console.log(destinations);
  console.log(vehicleType);

  const getData = async (e) => {
    e.preventDefault();
    const response = await axios.get(`https://git.heroku.com/cabservice-v1.git/ride/${city}/${vehicleType}/${origins}/${destinations}`);
    const result = response.data;
    if (result.message) {
      alert("Email needed");
    } else {
      alert("Ride found, Email not needed");
    }
  }

  return (
    <div className="App">
      <div className='appWrapper'>
        <div className='cityChoice'>
          Choose a city:
          <select className='cityDropdown' value={city} onChange={(e) => setCity(e.target.value)} >
            <option value='berlin'>Berlin</option>
            <option value='london'>London</option>
            <option value='paris'>Paris</option>
            <option value='amsterdam'>Amsterdam</option>
            <option value='barcelona'>Barcelona</option>
          </select>
        </div>
        <div className='vehicleType'>
          Choose a vehicle type:
          <select className='vehicleDropdown' value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} >
            <option value='Luxury'>Luxury</option>
            <option value='Comfort'>Comfort</option>
            <option value='BusinessVan'>Business Van</option>
            <option value='Coach'>Coach</option>
            <option value='Coach'>Coach</option>
            <option value='Minibus'>Minibus</option>
            <option value='Economy'>Economy</option>
          </select>
        </div>
        <div className='Location'>
          Enter your origin:
          <input type='text' placeholder='Starting Location' onChange={(e) => setOrigins(e.target.value)} />
          Enter your destination:
          <input type='text' placeholder='Destination' onChange={(e) => setDestinations(e.target.value)} />
        </div>
        <button className='submitBtn' type='submit' onClick={(e) => getData(e)}>Get Data</button>
        <div className='sampleData'>
          Sample Data: <br />
          <b>ORIGIN</b> <span>Westminster Abbey, 20 Deans Yd, Westminster, London SW1P 3PA, United Kingdom</span>
          <b>DESTINATIONS</b> <span>St John's Church, North End Rd, Fulham, London SW6 1PB, United Kingdom</span>
        </div>
      </div>
    </div>
  );
}

export default App;
