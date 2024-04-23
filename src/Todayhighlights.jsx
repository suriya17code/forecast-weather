import React from 'react'
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
const Todayhighlights = ({pm2_5,so2,no2,o3,sunrise,sunset,humidity,pressure,visibility,feelslike}) => {
  return (
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
           <p className="text-center">
              PM<sub>2_5</sub>
            </p>
            <span className="lg:text-2xl md:text-lg font-bold">
              {pm2_5}
            </span>
          </div>
          <div className="text-center">
            <p className="text-center">
              SO<sub>2</sub>
            </p>
            <span className="lg:text-2xl md:text-lg font-bold">
              {so2}
            </span>
          </div>
          <div className="text-center">
            <p className="text-center">
              NO<sub>2</sub>
            </p>
            <span className="lg:text-2xl md:text-lg font-bold">
              {no2}
            </span>
          </div>
          <div className="text-center">
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
  )
}

export default Todayhighlights