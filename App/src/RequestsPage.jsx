import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

function RequestsPage() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [isOn, setIsOn] = useState(true);

  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
  };

  const getRequests = async (isOn) => {
    await axios
      .get(`https://jsonplaceholder.typicode.com/${isOn ? "users" : "posts"}`)
      .then((res) => {
        setData(res.data);
        setFilter(res.data); // Initialize filter with the fetched data
      });
  };

  useEffect(() => {
    getRequests(isOn);
  }, [isOn]);
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "phone",
      headerName: "Contact",
      width: 150,
    },
    {
      field: "location",
      headerName: "Location",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
  ];

  const handleFilter = (e) => {
    const newData = data.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilter(newData);
  };

  return (
    <div className="flex flex-row h-screen w-full ">
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
            <span className="ml-2">{isOn ? "Bin" : "Pickups"}</span>
          </div>
          <input
            type="text"
            className="border border-g2 rounded-lg"
            onChange={handleFilter}
          />
        </div>
        {/* Conditional rendering: Render DataGrid only if data is available */}
        <div className="h-[500px]">
          {data.length > 0 && (
            <DataGrid columns={columns} rows={filter} pageSize={5} />
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestsPage;
