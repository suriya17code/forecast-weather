import React from "react";

const ForecastSlider = ({ forecastdate, formatday, formattime, wetherconditon, temptocelcias }) => {
  return (
    <>
      {forecastdate.length > 0 && forecastdate.slice(0, 2).map((dayData, index) => (
     <>  <h3 className="text-2xl pl-5">{formatday(dayData[0].dt_txt)}</h3>
        <div key={index} className="bg-gray-700 p-3 my-2 justify-evenly flex flex-wrap md:flex-nowrap lg:flex-nowrap rounded-lg lg:w-full">
        
          {dayData.map((item, itemIndex) => (
            <div key={itemIndex} className="container bg-slate-800 md:m-1 m-2 rounded-xl md:h-17 text-center">
              <div className="lg:text-xl"><p>{formattime(item.dt_txt)}</p></div>
              <div className="w-full flex justify-center">
                <div className="w-[70%]">
                  <img src={wetherconditon[item.weather[0].icon]} className="w-full" alt="weather icon" />
                </div>
              </div>
              <div className="lg:text-xl">
                <p>{temptocelcias(item.main.temp)}<span className="text-2xl">°</span></p>
              </div>
            </div>
          ))}
        </div>
    </>
      ))}
    </>
  );
};

export default ForecastSlider;
