import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { allcity } from "./features/wether/weatherSlice";
import clear from "./assets/images/sun.png";
import snow from "./assets/images/snow.png";
import scatteredClouds from "./assets/images/Clouds.png";
import rain from "./assets/images/rain.png";
import fewcloud from "./assets/images/partly-cloudy.png";
import storm from "./assets/images/storm.png";
import mist from "./assets/images/fog.png";
import brokenclouds from "./assets/images/cloudy.png";
import axios from "axios";
import './index.css';
import ForecastSlider from "./ForecastSlider";
import Location from "./Location";
import Fivedaysforecast from "./Fivedaysforecast";
import Temp from "./Temp";
import Mainpart from "./Mainpart";
import Todayhighlights from "./Todayhighlights";
const WeatherUI = () => {
  const { cityname } = useSelector(allcity);
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [name, setname] = useState("");
  const [weather, setweather] = useState("");
  const [sunrise, setsunrise] = useState(null);
  const [sunset, setsunset] = useState(null);
  const [country, setcountry] = useState("");
  const [lon, setlon] = useState(null);
  const [lat, setlat] = useState(null);
  const [icon, seticon] = useState(fewcloud);
  const [humidity, sethumidity] = useState(null);
  const [pressure, setpressure] = useState(null);
  const [feelslike, setfeelslike] = useState(null);
  const [visibility, setvisibility] = useState(null);
  const [o3, seto3] = useState(null);
  const [no2, setno2] = useState(null);
  const [so2, setso2] = useState(null);
  const [pm2_5, setpm2_5] = useState(null);
  const [date, setdate] = useState("");
  const [day, setday] = useState("");
  const [forecastdate, setforecastdate] = useState([]);
  const[maxtemp,setmaxtemp]=useState('')
  const[mintemp,setmintemp]=useState('')
  const wetherconditon = {
    "01d": clear,
    "02d": fewcloud,
    "03d": scatteredClouds,
    "04d": brokenclouds,
    "09d": rain,
    "10d": rain,
    "11d": storm,
    "13d": snow,
    "50d": mist,
    "01n": clear,
    "02n": fewcloud,
    "03n": scatteredClouds,
    "04n": brokenclouds,
    "09n": rain,
    "10n": rain,
    "11n": storm,
    "13n": snow,
    "50n": mist,
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const currentWeatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=54f80d1259009d7402c8c9ecac425d1d`
        );
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=54f80d1259009d7402c8c9ecac425d1d`
        );
        const airPollutionResponse = await axios.get(
          "https://api.openweathermap.org/data/2.5/air_pollution?lat=51.5085&lon=-0.1257&appid=54f80d1259009d7402c8c9ecac425d1d"
        );

        // Process the data as needed
        // For example:
        const weatherData = {
          currentWeather: currentWeatherResponse.data,
          forecast: forecastResponse.data,
          airPollution: airPollutionResponse.data,
        };
        const { currentWeather, forecast, airPollution } = weatherData;

        function getNext5DaysWeather(data) {
          const dailyWeather = {};

          // Iterate through the list of weather data
          data.list.forEach((item) => {
            // Extract the date without the time part
            const date = item.dt_txt.split(" ")[0];
            // If the date is not in the dictionary, add it with an empty array
            if (!dailyWeather[date]) {
              dailyWeather[date] = [];
            }
            // Append the weather data for the day to the array
            dailyWeather[date].push(item);
          });

          // Select only the next 5 days of weather data
          const next5Days = Object.values(dailyWeather).slice(0, 5);
          return next5Days;
        }
        setforecastdate(getNext5DaysWeather(forecast));

        seto3(airPollution.list[0].components.o3);
        setno2(airPollution.list[0].components.no2);
        setso2(airPollution.list[0].components.so2);
        setpm2_5(airPollution.list[0].components.pm2_5);
        const dtTxt = forecast.list[0].dt_txt;
         const maxtempdata =forecast.list[0].main.temp_max;
         const mintempdata =forecast.list[0].main.temp_min;
          setmaxtemp(maxtempdata)
          setmintemp(mintempdata)

        const geticon = currentWeather.weather[0].icon;
        seticon(wetherconditon[geticon]);
        const date = new Date(dtTxt);
        const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" }); // Output: Saturday
        const options = { day: "2-digit", month: "short" };
        const formattedDate = date.toLocaleDateString("en-US", options); // Output: 15-Apr

        setday(dayOfWeek); // Output: Saturday
        setdate(formattedDate);

        const sunriseTimestamp = currentWeather.sys.sunrise * 1000; // Convert to milliseconds
        const sunsetTimestamp = currentWeather.sys.sunset * 1000; // Convert to milliseconds

        const sunriseDate = new Date(sunriseTimestamp);
        const sunsetDate = new Date(sunsetTimestamp);

        const sunriseTimeString = sunriseDate.toLocaleTimeString();
        const sunsetTimeString = sunsetDate.toLocaleTimeString();
        const kmvisibility = currentWeather.visibility / 1000;

        // console.log(currentWeather);
        // console.log(forecast );
        // console.log(airPollution);
        const temperature = currentWeather.main.temp;
        const feelike = currentWeather.main.feels_like;
        const tempInCelsius = Math.round(temperature - 273.15);
        const feel_like     = Math.round(feelike - 273.15);
       
        setCurrentTemperature(tempInCelsius);
        setname(currentWeather.name);
        setcountry(currentWeather.sys.country);
        setlat(currentWeather.coord.lat);
        setlon(currentWeather.coord.lon);
        setweather(currentWeather.weather[0].main);
        setsunrise(sunriseTimeString);
        setsunset(sunsetTimeString);
        // seticon(currentWeather.weather[0].icon)
        sethumidity(currentWeather.main.humidity);
        setvisibility(kmvisibility);
        setpressure(currentWeather.main.pressure);
        setfeelslike(feel_like);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);
  // map effect
  useEffect(() => {
    // Initialize the map
    const initMap = () => {
      // Coordinates from the API response
      const coordinates = { lat: 51.5085, lng: -0.1257 };

      // Create a map centered at the specified coordinates
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 10, // Zoom level
        center: coordinates, // Center the map at the specified coordinates
      });

      // Add a marker at the specified coordinates
      new window.google.maps.Marker({
        position: coordinates,
        map: map,
      });
    };

    // Load the Google Maps JavaScript API script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=${initMap}`;
    script.defer = true;
    script.async = true;

    // Attach the script to the document
    document.head.appendChild(script);

    // Clean up
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  const formatDate = (dt_Txt) => {
    const date = new Date(dt_Txt);
    const options = { day: "2-digit", month: "short" };
    return date.toLocaleDateString("en-US", options); // Example Output: "15-Apr 09:00"
  };
  const formatday = (day) => {
    const forecastday = new Date(day);
    const option = { weekday: "long" };
    return forecastday.toLocaleDateString("en-US", option);
  };
  const formattime=(time)=>{
        const settime= new Date(time)
        
        const option={hour:'numeric',hour12: true} ;
       
       const gettime= settime.toLocaleTimeString("en-US", option)
        return  gettime
  }
  const temptocelcias=(temp)=>{
    const cel =  Math.round(temp-273.15)
    return cel;
      }
      const mapsrc = `https://maps.google.com/maps?q=${lat},${lon}&hl=en&z=12&output=embed`;

  return (
    <div className="md:flex  bg-gray-700 text-white  h-full   lg:justify-evenly">
      {/* left */}
      <div className=" p-4 lg:rounded-lg xl:w-[30%] md:w-[40%] lg:w-1/2 rounded-xl md:rounded-none bg-gray-700">
        <div className="flex  items-center mb-4  ">
          <Mainpart name={name} currentTemperature={currentTemperature} icon={icon} weather={weather} date={date} day={day} country={country}/>
        </div>
        <Temp maxtemp={maxtemp} mintemp={mintemp} temptocelcias={temptocelcias} />
        <Fivedaysforecast formatDate={formatDate} forecastdate={forecastdate} wetherconditon={wetherconditon}temptocelcias={temptocelcias} formatday={formatday} />
      </div>
      {/* right */}
      <div className="right xl:w-[65%] md:w-[60%]">
       <Todayhighlights pm2_5={pm2_5} so2={so2} no2={no2} o3={o3} sunrise={sunrise} sunset={sunset} humidity={humidity} pressure={pressure} visibility={visibility} feelslike={feelslike} />
        <div  className="   bg-gray-700 lg:rounded-lg   ">
        <h2 className="font-bold text-2xl py-4 pl-5"> 2 days of  Forecast climate for every 3 hours</h2>
        <ForecastSlider forecastdate={forecastdate} formatday={formatday}formattime={formattime}  wetherconditon={wetherconditon}temptocelcias={temptocelcias}/>
        </div>
    <Location lat={lat} lon={lon}/>
      </div>
    </div>
  );
};

export default WeatherUI;
