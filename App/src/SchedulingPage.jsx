import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { DataGrid } from "@mui/x-data-grid";
import AddScheduleModal from "./AddScheduleModal";
import { client } from "../../apiEndpoints/endpoints.js";

function SchedulingPage() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      // Replace 'your-api-endpoint' with the actual endpoint for fetching complaints
      const response = await client.get("/Task/");
      const responseData = response.data.data;
      console.log(responseData);
      const Task = Array.isArray(responseData) ? responseData : [responseData]; // Wrap the data in an array if not already an array
      setData(Task);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Tasks:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      field: "driverFullName",
      headerName: "Driver",
      width: 200,
      valueGetter: (params) => {
        const driver = params.row.driver;
        if (driver) {
          // If the driver object exists, combine firstName and lastName to form the full name
          return `${driver.firstName} ${driver.lastName}`;
        } else {
          // If the driver object is undefined, return an empty string
          return "";
        }
      },
    },
    {
      field: "taskType",
      headerName: "Task",
      width: 150,
    },
    {
      field: "taskCompleted",
      headerName: "Status",
      width: 150,
    },
    {
      field: "DateCompleted",
      headerName: "Date Created",
      width: 200,
      valueGetter: (params) => {
        // Assuming the "DateCompleted" field is in ISO date format
        const DateCompleted = new Date(params.row.DateCompleted);
        return DateCompleted.toLocaleString(); // Format the date as per your requirements
      },
    },
  ];
  const rowsWithIds = data.map((row) => ({
    ...row,
    id: row._id,
    driverFullName: row.driver ? `${row.driver.firstName} ${row.driver.lastName}` : "", // Conditional check for driver object
  }));
  
  const handleFilter = (e) => {
    const filterText = e.target.value.toLowerCase();
    const newData = data.filter((row) => {
      return (
        row.driver.firstName.toLowerCase().includes(filterText) || // Search by first name
        row.driver.lastName.toLowerCase().includes(filterText) || // Search by last name
        row.taskType.toLowerCase().includes(filterText) ||
        row.taskCompleted.toLowerCase().includes(filterText) ||
        row.DateCompleted.toLowerCase().includes(filterText)
      );
    });
    setFilter(newData);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddSuccess = () => {
    // Call the getData function to refresh the data after adding a new task
    getData();
  };

  return (
    <div className="flex flex-row h-screen w-full">
      <Dashboard />
      <div className="h-screen w-full bg-gray-100 overflow-hidden">
        <div className="flex justify-between p-4 m-4 w-full">
          <h1 className="font-semibold text-3xl text-g4">Schedules</h1>
          <button
            onClick={handleOpenModal}
            className="flex justify-center items-center bg-g3 rounded-full h-10 w-10 text-white"
          >
            +
          </button>
        </div>
        <div className="flex justify-end m-4">
          <input
            type="text"
            className="border border-g2 rounded-lg"
            onChange={handleFilter}
            placeholder="Search"
          />
        </div>
        {/* Conditional rendering: Render DataGrid only if data is available */}
        <div className="h-[500px]">
          {data.length > 0 ? (
            <DataGrid columns={columns} rows={filter.length > 0 ? filter : rowsWithIds} pageSize={10} />
          ) : (
            <p>Loading data...</p>
          )}
        </div>
        <AddScheduleModal isOpen={isModalOpen} onClose={handleCloseModal} onSuccess={handleAddSuccess} />
      </div>
    </div>
  );
}

export default SchedulingPage;
