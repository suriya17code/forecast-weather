import React from "react";
import {useSelector}from 'react-redux'
import{ allcity }from './features/wether/weatherSlice'
const Weatherapp = () => {

const {cityname}=useSelector(allcity);

  return (
    <>
    <div className="w-full h-lvh bg-cyan-300 flex justify-center">
    <h1 className="bg-blue-800 p-16 w-1/2 h-1/2 my-auto text-center text-amber-400 text-[50px] ">
     city name:{cityname}</h1>  
    </div>
 
    </>
  );
};

export default Weatherapp;


