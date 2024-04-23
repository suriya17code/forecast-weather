import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import axios from "axios";
import {useDispatch}from 'react-redux';
import{ addcityname} from './features/wether/weatherSlice'
import { Country, State, City }  from 'country-state-city';
// console.log(Country.getAllCountries())
console.log(City.getCitiesOfCountry('IN'))
import { Link } from "react-router-dom";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "name", numeric: false, disablePadding: false, label: "City Name" },
  { id: "country", numeric: false, disablePadding: false, label: "Country" },
  { id: "timezone", numeric: false, disablePadding: false, label: "Timezone" },
  {
    id: "country_code",
    numeric: false,
    disablePadding: false,
    label: "Country Code",
  },
  {
    id: "coordinates",
    numeric: false,
    disablePadding: false,
    label: "Latitude, Longitude",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className="bg-gray-500">
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function CustomizedTables() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(
        "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100&offset=9900"
      )
      .then((res) => {
        setData(res.data.results);
        console.log(res.data.results);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch data. Please try again later.");
      });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value === "") {
      setSuggestions([]);
    } else {
      const filteredSuggestions = data.filter((city) =>
        city.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion.name);
    setSuggestions([]);
  };
const dispatch =useDispatch();
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Toolbar className=" sticky top-0  bg-slate-900 text-white" >
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
             Global Cities
            </Typography>

            <input
              className="border-4 rounded-full focus:outline-none text-gray-500 text-lg"
              type="text"
              placeholder="Search City"
              value={search}
              onChange={handleInputChange}
            />
          </Toolbar>
          {error && (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          )}
          <div className="flex justify-end">
            <div className="absolute z-20 bg-gray-700 rounded-xl top-12 right-7 mt-1 text-white w-[200px] ">
              {suggestions.length > 0 && (
                <ul className="suggestions-list block z-20">
                  {suggestions.map((city, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(city)}>
                      {city.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(data, getComparator(order, orderBy))
                  .filter(
                    (item) =>
                      search === "" ||
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((city) => (
                    <TableRow key={city.geoname_id}> 
                      <TableCell
                        component="th"
                        scope="row"
                        className="bg-gray-100 border-x-4"
                      >  <Link 
                      to="/weather"
                      onClick={(e) => 
                        dispatch(addcityname(e.target.value))
                      }
                      onContextMenu={(e) => {
                        e.preventDefault(); // Prevent default context menu
                        dispatch(addcityname(e.target.value)); // Dispatch action with the button's value
                        window.open("/weather", "_blank"); // Open link in a new tab
                      }}
                    >
                      <button value={city.name} >
                      {city.name}
                      </button>
                      
                    </Link>
                    
                      </TableCell>
                      <TableCell>                    
                          {city.cou_name_en}
                      </TableCell>
                      <TableCell className="bg-gray-100  border-x-4">
                        {city.timezone}
                      </TableCell>
                      <TableCell>{city.country_code}</TableCell>
                      <TableCell className="bg-gray-100 border-x-4">
                        {city.coordinates.lat} , {city.coordinates.lon}
                      </TableCell>
                    </TableRow>
                   
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}
