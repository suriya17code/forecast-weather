import React from 'react'

const Mainpart = ({currentTemperature,icon,weather,date,day,name,country}) => {
  return (
    <div className=" bg-slate-800 p-11 lg:w-full rounded-2xl w-full ">
            <h2 className="text-lg mb-1 font-bold">Now</h2>
            <div className="flex items-center   justify-between">
              <span className="text-6xl font-semibold">
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
  )
}

export default Mainpart