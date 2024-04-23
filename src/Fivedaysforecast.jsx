import React from 'react'

const Fivedaysforecast = ({forecastdate,wetherconditon,temptocelcias,formatDate,formatday}) => {
  return (
    
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
  )
}

export default Fivedaysforecast