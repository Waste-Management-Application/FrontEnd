import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { DataGrid } from "@mui/x-data-grid";
import { client } from "../../apiEndpoints/endpoints.js";
import RegistrationModal from "./RegistrationModal";

function RegistrationPage() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [isOn, setIsOn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleToggle = () => {
    setLoading(true);
    setIsOn(!isOn);
    setFilter(data); // Reset the filter to show all rows when toggle changes
  };

  const getRequests = async (requestType) => {
    try {
      const response = await client.get(`/${requestType}`);
      const responseData = response.data.map((row) => ({
        id: row._id,
        number: isOn ? row.dustbinNo : row.vehicleNo,
        date: row.DateCreated,
      }));

      setData(responseData);
      setFilter(responseData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getRequests(isOn ? "dustbins" : "vehicles");
  }, [isOn]);

  useEffect(() => {
    // Apply filter based on the search input
    if (searchInput.trim() === "") {
      // If search input is empty, reset filter to the original data
      setFilter(data);
    } else {
      // Apply filter based on the search input
      const filteredData = data.filter((row) =>
        row.number.toString().includes(searchInput)
      );
      setFilter(filteredData);
    }
  }, [searchInput, data]);

  const columns = [
    {
      field: "number",
      headerName: isOn ? "Dustbin No" : "Vehicle No",
      width: 150,
    },
    {
      field: "date",
      headerName: "Date Created",
      width: 200,
      valueGetter: (params) => {
        const dateCreated = new Date(params.row.date);
        return dateCreated.toLocaleString();
      },
    },
  ];

  const handleFilter = (e) => {
    setSearchInput(e.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRowClick = (params) => {
    // Get the full data of the clicked row
    const selectedRow = data.find((row) => row.id === params.id);
    setModalData(selectedRow);
    handleOpenModal();
  };

  return (
    <div className="flex flex-row h-screen w-full">
      <Dashboard />
      <div className="h-screen w-full bg-gray-100 overflow-hidden">
        <div className="flex justify-between p-4 m-4 w-full">
          <h1 className="font-semibold text-3xl text-g4">Registration</h1>
        </div>
        <div className="flex justify-between m-4 ">
          <div className="flex items-center">
            <button
              className={`w-12 h-6 rounded-full ${
                isOn ? "bg-g2" : "bg-g3"
              }`}
              onClick={handleToggle}
            >
              <span
                className={`block w-4 h-4 rounded-full duration-500 ${
                  isOn ? "transform translate-x-6 bg-white" : "bg-white"
                }`}
              ></span>
            </button>
            <span className="ml-2">
              {isOn ? "Dustbin" : "Vehicle"} Registration
            </span>
          </div>
          <input
            type="text"
            className="border border-g2 rounded-lg"
            placeholder="Search by number"
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
              rowId="id"
              onRowClick={handleRowClick}
            />
          ) : (
            <p>No {isOn ? "dustbin" : "vehicle"} data available</p>
          )}
        </div>
      </div>
      {/* Render RegistrationModal component */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={modalData}
        isOn={isOn}
      />
    </div>
  );
}

export default RegistrationPage;
