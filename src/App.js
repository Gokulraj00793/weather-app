import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Renamed error state

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=4db4d350f4b55db20eb12cae1182c42b`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setErrorMessage(""); // Clear error when successful
        })
        .catch(() => {
          setErrorMessage("Location not found, please try again."); // Updated error message
          setData({});
        });
      setLocation("");
    }
  };

  return (
    <div className="app min-h-screen max-w-screen ">
      <div className="search text-center p-4 md:max-w-screen">
        <input
          className="border rounded p-2"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation} // Replaced onKeyPress with onKeyDown
          type="text"
          placeholder="Enter location"
        />
        {errorMessage && <p className="text-white mt-2">{errorMessage}</p>}
      </div>

      <div className="container max-w-[700px] h-[700px] m-auto px-0 py-[1rem] relative top-[10%] flex flex-col justify-between">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp font-extrabold">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom flex justify-evenly">
            <div className="feels font-bold">
              {data.main ? <p>{data.main.feels_like.toFixed()}°F</p> : null}
              <p className="p">Feels Like</p>
            </div>
            <div className="humidity font-bold">
              {data.main ? <p>{data.main.humidity}%</p> : null}{" "}
              {/* Fixed humidity unit */}
              <p className="p">Humidity</p>
            </div>
            <div className="wind font-bold">
              {data.wind ? <p>{data.wind.speed.toFixed()} MPH</p> : null}
              <p className="p">Wind Speed</p>
            </div>
          </div>
        )}
        <div className="flex ">
          <a href="https://www.linkedin.com/in/gokulraj71845">
            <img
              className="mr-10 "
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/50/linkedin.png"
              alt="linkedin"
            />
          </a>

          <a href="https://github.com/Gokulraj00793">
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/50/github.png"
              alt="github"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
