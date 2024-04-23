import CustomizedTables from "./CustomizedTables";
import Frontpage from "./Frontpage";

import Navbar from "./Navbar";
import WeatherUI from "./WeatherUI";
import Weatherapp from "./Weatherapp";
import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>

      <Routes>
        <Route path="/" element={<CustomizedTables />} />
        <Route path="/weather" element={  <WeatherUI /> } />
      </Routes>
    </Router>
   
    </>
  )
}

export default App;
