import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import AddScheduleModal from "./AddScheduleModal";

function DriversPage() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getData = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setData(res.data);
        setFilter(res.data); // Initialize filter with the fetched data
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      field: "driver",
      headerName: "Driver",
      width: 150,
    },
    {
      field: "task",
      headerName: "Task",
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
          <h1 className="font-semibold text-3xl text-g4">Schedules</h1>
          <button
            onClick={handleOpenModal}
            className="flex justify-center items-center bg-g3 rounded-full h-10 w-10 text-white"
          >
            +
          </button>
        </div>
        <div className="flex justify-end m-4 ">
          <input
            type="text"
            className="border border-g2 rounded-lg"
            onChange={handleFilter}
            placeholder="Search"
          />
        </div>
        {/* Conditional rendering: Render DataGrid only if data is available */}
        <div className="h-[500px]">
          {data.length > 0 && (
            <DataGrid columns={columns} rows={filter} pageSize={1} />
          )}
        </div>
        <AddScheduleModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </div>
  );
}

export default DriversPage;
