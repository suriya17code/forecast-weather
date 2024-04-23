import React from 'react'

const Location = ({lat,lon}) => {
  const mapsrc = `https://maps.google.com/maps?q=${lat},${lon}&hl=en&z=12&output=embed`;

  return (
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
  )
}

export default Location