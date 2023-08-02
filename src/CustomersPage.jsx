import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { client } from "../apiEndpoints/endpoints";

function CustomersPage() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState("");
  const [locationStrings, setLocationStrings] = useState({});
  const [locationStringsFetched, setLocationStringsFetched] = useState(false);

  const getData = async () => {
    try {
      const response = await client.get("customers");
      const rawData = response.data.data.customers;
      const processedData = rawData.map((customer) => {
        const {
          _id,
          role,
          __v,
          passwordChangedAt,
          DateRegistered,
          firstName,
          lastName,
          email,
          contact,
          gender,
          passwordResetExpires,
          passwordResetToken,
          location,
        } = customer;

        // Extract latitude and longitude from coordinates
        const latitude = location?.coordinates[1] || 0;
        const longitude = location?.coordinates[0] || 0;

        return {
          id: _id,
          DateRegistered,
          contact,
          email,
          gender,
          name: `${firstName} ${lastName}`,
          location: {
            latitude,
            longitude,
          },
        };
      });

      setData(processedData);
      setFilter(processedData);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  const fetchLocationStrings = async (rowData) => {
    const newLocationStrings = {};
    for (const customer of rowData) {
      if (
        customer.location &&
        customer.location.latitude !== 0 &&
        customer.location.longitude !== 0
      ) {
        try {
          const locationString = await getLocationString(
            customer.location.latitude,
            customer.location.longitude
          );
          newLocationStrings[customer.id] = locationString;
        } catch (error) {
          console.error("Error fetching location data:", error.message);
          newLocationStrings[customer.id] = "Unknown Location";
        }
      } else {
        newLocationStrings[customer.id] = "Unknown Location";
      }
    }
    setLocationStrings(newLocationStrings);
    setLocationStringsFetched(true);
  };

  useEffect(() => {
    getData();
    setUser("Customer");
  }, []);

  useEffect(() => {
    if (!locationStringsFetched && data.length > 0) {
      setLocationStringsFetched(true);
      fetchLocationStrings(data);
    }
  }, [locationStringsFetched, data]);

  const getLocationString = async (latitude, longitude) => {
    const mapboxApiKey =
      "pk.eyJ1IjoiZGFiYXJkZW4iLCJhIjoiY2xrZmQzY3MyMGMzbTNzbzVydWM0d3ZueCJ9.BtD3WGO5D3C8fbfCDyDlhg"; // Replace with your Mapbox API key
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxApiKey}`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
      if (data.features && data.features.length > 0) {
        // Return the location string if available
        return data.features[0].place_name;
      } else {
        // If no location is found, return a default value
        return "Unknown Location";
      }
    } catch (error) {
      // Handle any errors during the API call and return a default value
      console.error("Error fetching location data:", error.message);
      return "Unknown Location";
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "contact",
      headerName: "Contact",
      width: 120,
    },
    {
      field: "location",
      headerName: "Location",
      width: 250,
      valueGetter: (params) => {
        const { latitude, longitude } = params.row.location;
        return locationStrings[params.row.id] || "Unknown Location";
      },
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 120,
    },
    {
      field: "DateRegistered",
      headerName: "Date Registered",
      width: 200,
      valueGetter: (params) => {
        const DateRegistered = new Date(params.row.DateRegistered);
        return DateRegistered.toLocaleString();
      },
    },
  ];

  const handleFilter = (e) => {
    const newData = data.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilter(newData);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-row h-screen w-full ">
      <Dashboard />
      <div className="h-screen w-full bg-gray-100 overflow-hidden">
        <div className="flex justify-between p-4 m-4 w-full">
          <h1 className="font-semibold text-3xl text-g4">Customers</h1>
        </div>
        <div className="flex justify-end m-4 ">
          <input
            type="text"
            className="border border-g2 rounded-lg"
            placeholder="Search"
            onChange={handleFilter}
          />
        </div>
        <div className="h-[500px]">
          {data.length > 0 && (
            <DataGrid columns={columns} rows={filter} pageSize={5} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomersPage;
