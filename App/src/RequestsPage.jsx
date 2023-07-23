import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { client } from "../../apiEndpoints/endpoints.js";

function RequestsPage() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [isOn, setIsOn] = useState(true);
  const [loading, setLoading] = useState(true);
  //const [locationStringsFetched, setLocationStringsFetched] = useState(false);

  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
  };

  const getRequests = async (requestType) => {
    try {
      console.log("Fetching data...");
      const res = await client.get(`${requestType}?timestamp=${Date.now()}`);
      console.log("Response data:", res.data);
      const responseData = res.data.data.map((row) => ({
        ...row,
        id: row._id,
      }));
      setData(responseData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };


  useEffect(() => {
    setLoading(true); // Set loading state to true before making the API call
    getRequests(isOn ? "/dustbinRequest" : "/pickupRequest");
  }, [isOn]);

  // useEffect(() => {
  //   if (data.length > 0) {
  //     setLocationStringsFetched(false); // Reset locationStringsFetched before fetching location strings
  //     fetchLocationStrings(data);
  //   }
  // }, [data]);

  // // Function to fetch location strings for each row and update the filter state
  // const fetchLocationStrings = async (rowData) => {
  //   const newData = await Promise.all(
  //     rowData.map(async (row) => {
  //       if (row.customer && row.customer.location && row.customer.location.coordinates) {
  //         const locationString = await getLocationString(
  //           row.customer.location.coordinates[1],
  //           row.customer.location.coordinates[0]
  //         );
  //         return { ...row, location: locationString };
  //       }
  //       // If customer or location data is not available, return the row as is
  //       return row;
  //     })
  //   );
  //   setFilter(newData);
  //   setLocationStringsFetched(true); // Set the locationStringsFetched to true after data is fetched
  // };

  // // Function to get the readable location using the Mapbox Geocoding API
  // const getLocationString = async (latitude, longitude) => {
  //   const mapboxApiKey = "pk.eyJ1IjoiZGFiYXJkZW4iLCJhIjoiY2xrZmQzY3MyMGMzbTNzbzVydWM0d3ZueCJ9.BtD3WGO5D3C8fbfCDyDlhg"; // Replace with your Mapbox API key
  //   const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxApiKey}`;

  //   try {
  //     const response = await axios.get(apiUrl);
  //     const data = response.data;
  //     if (data.features && data.features.length > 0) {
  //       return data.features[0].place_name;
  //     } else {
  //       return "Unknown Location";
  //     }
  //   } catch (error) {
  //     console.error("Error fetching location data:", error.message);
  //     return "Unknown Location";
  //   }
  // };

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
          return "Unknown"; // Fallback value if customer data is missing
        }
      },
    },
    {
      field: "contact",
      headerName: "Contact",
      width: 150,
      valueGetter: (params) => {
        const customer = params.row.customer;
        return customer ? customer.contact : "Unknown"; // Access the correct nested property
      },
    },
    {
      field: "location",
      headerName: "Location",
      width: 150,
      valueGetter: (params) => {
        const customer = params.row.customer;
        if (customer && customer.location) {
          return customer.location.digitalAddress || "Unknown";
        } else {
          return "Unknown";
        }
      },
    },
    
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "requestDate",
      headerName: "Date Requested",
      width: 200,
      valueGetter: (params) => {
        // Assuming the "requestDate" field is in ISO date format
        const requestDate = new Date(params.row.requestDate);
        return requestDate.toLocaleString(); // Format the date as per your requirements
      },
    },
  ];
  

  
  const handleFilter = (e) => {
    const newData = data.filter((row) => {
      return (
        row.customer.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.customer.lastName.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setFilter(newData);
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
            <span className="ml-2">{isOn ? "Dustbin" : "Pickups"} Requests</span>
          </div>
          <input
            type="text"
            className="border border-g2 rounded-lg"
            placeholder="Search by name"
            onChange={handleFilter}
          />
        </div>
       {/* Conditional rendering: Render DataGrid only if data is available */}
       <div className="h-[500px]">
          {loading ? (
            <p>Loading...</p>
          ) : data.length > 0 ? (
            <DataGrid columns={columns} rows={data} pageSize={5} rowId="_id" />
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestsPage;
