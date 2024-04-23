import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { allcity } from "./features/wether/weatherSlice";
import {
  FaCloud,
  FaSun,
  FaMoon,
  FaEye,
  FaTint,
  FaTemperatureHigh,
  FaWaveSquare,
  FaMap,
} from "react-icons/fa";
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
          "http://api.openweathermap.org/data/2.5/air_pollution?lat=51.5085&lon=-0.1257&appid=54f80d1259009d7402c8c9ecac425d1d"
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
          <div className=" bg-slate-800 p-11 lg:w-full rounded-2xl w-full ">
            <h2 className="text-lg mb-1 font-bold">Now</h2>
            <div className="flex items-center   justify-between">
              <span className="text-4xl font-semibold">
                {currentTemperature}°C
              </span>
              <img src={icon} className="w-1/2" />
            </div>
            <div className="text-[12px] justify-start flex  border-b-2 border-zinc-200 ">
              <span className="mt-2 text-2xl font-bold text-yellow-500">
                {weather}
              </span>
            </div>
            <p className="mt-3">
              {day},{date}
            </p>
            <p className="text-[45px] ">
              {name},{country}
            </p>
          </div>
        </div>
        <div className="temp ">
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg"> Today</h2>
            <div className="flex justify-between"> 
              <label>( low )</label>
              <label>( high )</label>         
            </div>
           <div className="flex justify-between "> 
           <label>{temptocelcias(mintemp) } °C</label>
           <label>{temptocelcias(maxtemp) } °C</label>
          
           </div>
            <div className="w-full tempcolor rounded-xl h-3 mt-2 "></div>
          </div>
        </div>
        {/* {forecastdate.length > 0 && forecastdate.map((dayData, index) => (
          <>   
            
           <div key={index} className="bg-gray-700  p-1  rounded-lg  " >
           <div className="temp ">
          <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="">{formatday(dayData[0].dt_txt)}</h3>
            <div className="flex justify-between"> 
              <label>( low )</label>
              <label>( high )</label>         
            </div>
           <div className="flex justify-between "> 
           <label>20</label>
            <label>10</label>
           </div>
            <div className="w-full tempcolor rounded-xl h-3 mt-2 "></div>
          </div>
        </div>
    </div>
    </>
))} */}

        <div className="">
          <h2 className="text-lg font-bold mb-2">5 Days Forecast</h2>
          <div className=" flex-row justify-start ">
            { 
              forecastdate.map((dayData, index) => (
                <div
                  key={index}
                  className="bg-slate-800 p-3 my-2  justify-evenly  flex rounded-lg lg:w-full"
                ><div className="w-[50%]">
                  <img src={wetherconditon[dayData[0].weather[0].icon]} className="w-[40%]"/></div>
                  <div className="w-[50%] text-xl">  <p >{temptocelcias(dayData[0].main.temp) }<span className="text-2xl">°</span></p></div>
                <div className="w-[50%]">  <p> {formatDate(dayData[0].dt_txt)}</p></div>
                <div className="w-[50%]">  <p>{formatday(dayData[0].dt_txt)}</p></div>
                </div>
              ))}

            {/* <div className="bg-slate-800 p-3 my-2  justify-evenly  flex rounded-lg lg:w-full">
              <FaCloud className="text-5xl" />
              <span>{7}°</span>
              <p>3 Mar</p>
              <p>Friday</p> forecastdate.length > 0 &&
            </div> */}
          </div>
        </div>
      </div>
      {/* right */}
      <div className="right xl:w-[65%] md:w-[60%]">
        <div className="today-highlights bg-gray-600 mt-4 rounded-xl m-1">
          <h2 className="text-lg font-bold  px-3 pt-6 ">Todays Highlights</h2>

          <div className="md:flex  justify-between lg:px-5 lg:pt-5  ">
            <div className="p-3 mb-2 justify-between lg:w-[50%] md:w-[50%] bg-slate-800 rounded-2xl">
              <div className="flex items-center mb-2 justify-between  bg-slate-800">
                <span className=" text-sm">Air Quality Index</span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-2xl mr-2">
                  Good
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-center">
                  {/* <FaTint className="text-2xl" /> */}
                  <p className="text-center">
                    PM<sub>2_5</sub>
                  </p>
                  <span className="lg:text-2xl md:text-lg font-bold">
                    {pm2_5}
                  </span>
                </div>
                <div className="text-center">
                  {/* <FaCloud className="text-2xl" /> */}
                  <p className="text-center">
                    SO<sub>2</sub>
                  </p>
                  <span className="lg:text-2xl md:text-lg font-bold">
                    {so2}
                  </span>
                </div>
                <div className="text-center">
                  {/* <FaEye className="text-2xl" /> */}
                  <p className="text-center">
                    NO<sub>2</sub>
                  </p>
                  <span className="lg:text-2xl md:text-lg font-bold">
                    {no2}
                  </span>
                </div>
                <div className="text-center">
                  {/* <FaEye className="text-2xl" /> */}
                  <p className="text-center">
                    O<sub>3</sub>
                  </p>
                  <span className="lg:text-2xl md:text-lg font-bold">{o3}</span>
                </div>
              </div>
            </div>

            <div className=" px-3 mb-2  justify-between  lg:w-[48%] md:w-[48%]   bg-slate-800 rounded-2xl ">
              {sunrise !== null && sunset !== null ? (
                <div>
                  <div className="flex items-center mb-2 justify-between  bg-slate-800">
                    <span className=" text-sm pt-3">sunrise & sunset</span>
                  </div>
                  <div className="flex justify-between mt-5">
                    <div className="flex items-center">
                      <FaSun className="text-[35px] mb-2 mr-2 " />
                      <div className="pl-1">
                        <p>sunrise</p>
                        <span className="lg:text-[22px]  ">{sunrise}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaMoon className="text-[35px] mb-2 " />
                      <div className="pl-1">
                        <p>sunset</p>
                        <span className="lg:text-[22px] ">{sunset}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>

          <div className="md:flex   xl:px-5 lg:pb-5 justify-between md:justify-center   items-center">
            <div className=" items-center bg-slate-800 xl:px-5 md:w-full pl-[16px] py-5 m-2 rounded-2xl lg:w-3/6 ">
              <div className="pb-5">
                <span className="text-sm">Humidity</span>
              </div>
              <div className="flex lg:w-[120px] w-full justify-between lg:text-2xl  font-semibold">
                <FaTint className="text-2xl mr-2" />
                <span className="lg:text-xl">{humidity}%</span>
              </div>
            </div>
            <div className=" items-center bg-slate-800 xl:px-5 md:w-full pl-[16px] py-5  m-2 rounded-2xl lg:w-3/6 ">
              <div className="pb-5">
                <span className="text-sm">Pressure</span>
              </div>
              <div className="flex  lg:w-[120px] w-full justify-between ">
                <FaWaveSquare className="text-2xl mr-2" />
                <span className="lg:text-xl">{pressure}hPa</span>
              </div>
            </div>
            <div className=" items-center bg-slate-800 xl:px-5 md:w-full pl-[16px] py-5 m-2 rounded-2xl  lg:w-3/6">
              <div className="pb-5">
                <span className="text-sm">Visibility</span>
              </div>
              <div className="flex  lg:w-[120px] w-full justify-between ">
                <FaEye className="text-2xl mr-2" />
                <span className="lg:text-xl">{visibility}km</span>
              </div>
            </div>
            <div className=" items-center bg-slate-800 xl:px-5 md:w-full pl-[16px] py-5 m-2 rounded-2xl  lg:w-3/6">
              <div className="pb-5">
                <span className="text-sm">Feels Like</span>
              </div>
              <div className="flex  lg:w-[120px] w-full justify-between ">
                <FaTemperatureHigh className="text-2xl mr-2" />
                <span className="lg:text-lg">{feelslike}°c</span>
              </div>
            </div>
          </div>
        </div>
        <div  className="   bg-gray-700 lg:rounded-lg   ">
        <h2 className="font-bold text-2xl py-4 pl-5"> 2 days of  Forecast climate for every 3 hours</h2>
          {forecastdate.length > 0 && forecastdate.slice(0,2).map((dayData, index) => (
          <>   
             <h3 className="text-2xl pl-5  ">{formatday(dayData[0].dt_txt)}</h3>
           <div key={index} className="bg-gray-700 p-3 my-2  justify-evenly   flex flex-wrap md:flex-nowrap  lg:flex-nowrap    rounded-lg lg:w-full" >
            {dayData.map((item, itemIndex) => (
              <> 
                <div key={itemIndex} className="container bg-slate-800 md:m-1 m-2 rounded-xl   md:h-17 text-center "> 
                <div className="lg:text-xl">  <p> {formattime(item.dt_txt)}</p></div>
             <div className="w-full flex justify-center">   <div className="w-[70%] "> <img src={wetherconditon[item.weather[0].icon]} className=" w-full"/></div></div> 
               <div className=" lg:text-xl">  <p >{temptocelcias(item.main.temp) }<span className="text-2xl">°</span> </p></div>
                </div>
                </>
            ))}
    
    </div>
    </>
))}
        </div>
        <div className="map w-full px-7 m-2 ">
      <iframe 
      className=" rounded-lg"
        width="100%"
        height="200"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={mapsrc}
        title="Google Maps Embed"
      >
        <a href="https://www.gps.ie/">gps vehicle tracker</a>
      </iframe>
    </div>
      </div>
    </div>
  );
};

export default WeatherUI;
