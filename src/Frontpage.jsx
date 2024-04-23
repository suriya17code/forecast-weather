import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
const Frontpage = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
   

    useEffect(() => {
        axios
            .get(
                'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=-1'
            )
            .then((res) => {
                setData(res.data.results);
                console.log(res.data.results)
            })
            .catch((err) => console.log(err));
    }, []);

    // Function to handle input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (value === "") {
            setSuggestions([]);
        } else {
            // Filter suggestions based on the input value
            const filteredSuggestions = data.filter(city =>
                city.name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        }
    };

    // Function to handle suggestion selection
    const handleSuggestionClick = (suggestion) => {
        setSearch(suggestion.name);
        setSuggestions([]);
    };

    return (
        <>

            <div className='mt-4  relative'>
              <div className='flex justify-center'>
                <input
                    type='text'
                    placeholder='Search'
                    className='w-3/5 border-2 p-1 rounded-3xl border-gray-700 border-spacing-5 placeholder:text-gray-800'
                    value={search}
                    onChange={handleInputChange}
                /></div>
                {/* Display auto-suggestions */}
                <div className='flex justify-center'>
                <div className=' absolute bg-gray-600 mt-0 rounded-lg  text-white w-3/5 '>  {suggestions.length > 0 && (
                    <ul className="suggestions-list block  z-20 ">
                        {suggestions.map((city, index) => (
                            <li key={index} onClick={() => handleSuggestionClick(city)}>
                                {city.name}
                            </li>
                        ))}
                    </ul>
                )}</div>
                </div>
            </div>

            
                    {/* {data.filter((item) =>
                        search === '' || item.name.toLowerCase().includes(search.toLowerCase())
                    ).map((city) => (
                        <p key={city.geoname_id}>
                            {city.name} - {city.cou_name_en} - {city.timezone}
                        </p>
                    ))} */}
                    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>citynames</StyledTableCell>
            <StyledTableCell align="right">country</StyledTableCell>
            <StyledTableCell align="right">timezone</StyledTableCell>
            <StyledTableCell align="right">country code</StyledTableCell>
            <StyledTableCell align="right">Coordinates</StyledTableCell>
            <StyledTableCell align="right">population</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {data.filter((item) =>
                        search === '' || item.name.toLowerCase().includes(search.toLowerCase())
                    ).map((city) => (
                        <StyledTableRow key={city.geoname_id}>
                        <StyledTableCell component="th" scope="row">
                        {city.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{city.cou_name_en}</StyledTableCell>
                        <StyledTableCell align="right">{city.timezone}</StyledTableCell>
                        <StyledTableCell align="right">{city.country_code}</StyledTableCell>
                        <StyledTableCell align="right">{city.coordinates.lat},{city.coordinates.lon}</StyledTableCell>
                         <StyledTableCell align="right">{city.population}</StyledTableCell>
                      </StyledTableRow>
                    ))}
            
      
        </TableBody>
      </Table>
    </TableContainer>
             
        </>
    );
};

export default Frontpage;
