import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { client } from "../apiEndpoints/endpoints";

function RequestsPage() {
  const [dustbinData, setDustbinData] = useState([]);
  const [pickupData, setPickupData] = useState([]);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [isOn, setIsOn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [locationStrings, setLocationStrings] = useState({});
  const [locationStringsFetched, setLocationStringsFetched] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleToggle = () => {
    setLoading(true);
    setLocationStringsFetched(false);
    setIsOn((prevState) => !prevState);
  };

  const getRequests = async (requestType) => {
    try {
      console.log("Fetching data...");
      const res = await client.get(`${requestType}?timestamp=${Date.now()}`);
      const responseData = res.data.data.map((row) => ({
        ...row,
        id: row._id,
      }));
      if (requestType === "/dustbinRequest") {
        setDustbinData(responseData);
      } else {
        setPickupData(responseData);
      }

      // Update the data state here
      setData(responseData);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (isOn) {
      getRequests("/dustbinRequest");
    } else {
      getRequests("/pickupRequest");
    }
  }, [isOn]);

  useEffect(() => {
    if (
      (!locationStringsFetched && dustbinData.length > 0) ||
      (!locationStringsFetched && pickupData.length > 0)
    ) {
      setLocationStringsFetched(true);
      fetchLocationStrings(isOn ? dustbinData : pickupData);
    }
  }, [locationStringsFetched, isOn, dustbinData, pickupData]);

  const fetchLocationStrings = async (rowData) => {
    const newLocationStrings = {};
    for (const row of rowData) {
      if (
        row.customer &&
        row.customer.location &&
        row.customer.location.coordinates
      ) {
        const locationString = await getLocationString(
          row.customer.location.coordinates[1],
          row.customer.location.coordinates[0]
        );
        newLocationStrings[row.id] = locationString;
      } else {
        newLocationStrings[row.id] = "Unknown Location";
      }
    }
    setLocationStrings(newLocationStrings);
    setLocationStringsFetched(true);
  };

  const getLocationString = async (latitude, longitude) => {
    const mapboxApiKey =
      "pk.eyJ1IjoiZGFiYXJkZW4iLCJhIjoiY2xrZmQzY3MyMGMzbTNzbzVydWM0d3ZueCJ9.BtD3WGO5D3C8fbfCDyDlhg";
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxApiKey}`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
      if (data.features && data.features.length > 0) {
        return data.features[0].place_name;
      } else {
        return "Unknown Location";
      }
    } catch (error) {
      console.error("Error fetching location data:", error.message);
      return "Unknown Location";
    }
  };

  useEffect(() => {
    // Apply filter based on the search input
    if (searchInput.trim() === "") {
      // If search input is empty, reset filter to the original data
      setFilter(data);
    } else {
      // Apply filter based on the search input
      const filteredData = data.filter(
        (row) =>
          row.customer.firstName
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          row.customer.lastName
            .toLowerCase()
            .includes(searchInput.toLowerCase())
      );
      setFilter(filteredData);
    }
  }, [searchInput, data]);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      valueGetter: (params) => {
        const customer = params.row.customer;
        if (customer) {
          return `${customer.firstName} ${customer.lastName}`;
        } else {
          return "Unknown";
        }
      },
    },
    {
      field: "contact",
      headerName: "Contact",
      width: 150,
      valueGetter: (params) => {
        const customer = params.row.customer;
        return customer ? customer.contact : "Unknown";
      },
    },
    {
      field: "location",
      headerName: "Location",
      width: 250,
      valueGetter: (params) => {
        if (!locationStringsFetched) {
          return "Loading...";
        }
        return locationStrings[params.row.id] || "Unknown Location";
      },
    },
    {
      field: "requestDate",
      headerName: "Date Requested",
      width: 200,
      valueGetter: (params) => {
        const requestDate = new Date(params.row.requestDate);
        return requestDate.toLocaleString();
      },
    },
  ];

  const handleFilter = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="flex flex-row h-screen w-full">
      <Dashboard />
      <div className="h-screen w-full bg-gray-100 overflow-hidden">
        <div className="flex justify-between p-4 m-4 w-full">
          <h1 className="font-semibold text-3xl text-g4">Requests</h1>
        </div>
        <div className="flex justify-between m-4 ">
          <div className="flex items-center">
            <button
              className={`w-12 h-6 rounded-full ${isOn ? "bg-g2" : "bg-g3"}`}
              onClick={handleToggle}
            >
              <span
                className={`block w-4 h-4 rounded-full duration-500 ${
                  isOn ? "transform translate-x-6 bg-white" : "bg-white"
                }`}
              ></span>
            </button>
            <span className="ml-2">
              {isOn ? "Dustbin" : "Pickups"} Requests
            </span>
          </div>
          <input
            type="text"
            className="border border-g2 rounded-lg"
            placeholder="Search by name"
            value={searchInput}
            onChange={handleFilter}
          />
        </div>
        <div className="h-[500px]">
          {loading ? (
            <p>Loading...</p>
          ) : filter.length > 0 ? (
            <DataGrid
              columns={columns}
              rows={filter}
              pageSize={5}
              rowId="_id"
            />
          ) : (
            <p>No {isOn ? "dustbin" : "pickup"} data available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestsPage;
