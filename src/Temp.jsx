import React from 'react'

const Temp = ({temptocelcias,mintemp,maxtemp}) => {
  return (
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
  )
}

export default Temp