import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { DataGrid } from "@mui/x-data-grid";
import { client } from "../apiEndpoints/endpoints";
import RegistrationModal from "./RegistrationModal";
import EditModal from "./UpdateVehicleModal";

function RegistrationPage() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [isOn, setIsOn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null); // State to store the selected vehicle for editing

  const getRequests = async (requestType) => {
    try {
      const response = await client.get(requestType);
      const responseData = response.data.data.map((row) => ({
        id: row._id,
        number: isOn ? row.dustbinNo : row.vehicleNo,
        date: row.DateCreated,
        driver: isOn ? null : row.driver, // Add driverName to the data for "Vehicle"
      }));

      setData(responseData);
      setFilter(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setUser("Registration");
    setLoading(true);
    if (isOn) {
      getRequests("/dustbin");
    } else {
      getRequests("/vehicle");
    }
  }, [isOn]);

  useEffect(() => {
    if (searchInput.trim() === "") {
      setFilter(data);
    } else {
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

  // Conditionally add the "Driver" column based on isOn state
  if (!isOn) {
    columns.push({
      field: "driver",
      headerName: "Driver",
      width: 200,
    });
  }

  const handleFilter = (e) => {
    setSearchInput(e.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle opening the edit modal and passing the selected vehicle data
  const handleEditModalOpen = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleEditModalClose = () => {
    setSelectedVehicle(null);
  };

  return (
    <div className="flex flex-row h-screen w-full">
      <Dashboard />
      <div className="h-screen w-full bg-gray-100 overflow-hidden">
        <div className="flex justify-between p-4 m-4 w-full">
          <h1 className="font-semibold text-3xl text-g4">
            {isOn ? "Dustbin" : "Vehicle"} Registration
          </h1>
          <button
            onClick={handleOpenModal}
            className="flex justify-center items-center bg-g3 rounded-full h-10 w-10 text-white"
          >
            +
          </button>
        </div>
        <div className="flex justify-between m-4 ">
          <div className="flex items-center">
            <button
              className={`w-12 h-6 rounded-full ${isOn ? "bg-g2" : "bg-g3"}`}
              onClick={() => {
                setLoading(true);
                setIsOn((prevIsOn) => !prevIsOn);
              }}
            >
              <span
                className={`block w-4 h-4 rounded-full duration-500 ${
                  isOn ? "transform translate-x-6 bg-white" : "bg-white"
                }`}
              ></span>
            </button>
            <span className="ml-2">{isOn ? "Bins" : "Vehicles"}</span>
          </div>
          <input
            type="text"
            className="border border-g2 rounded-lg"
            onChange={handleFilter}
            placeholder="Search by number"
          />
        </div>
        <div className="h-[500px]">
          {data.length > 0 && (
            <DataGrid
              columns={columns}
              rows={filter}
              pageSize={1}
              onRowClick={(params) => handleEditModalOpen(params.row)} // Handle row click to open the edit modal with selected vehicle data
            />
          )}
        </div>
      </div>

      {/* Render RegistrationModal component */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isOn={isOn}
      />

      {/* Render EditModal if selectedVehicle has data */}
      {selectedVehicle && (
        <EditModal
          isOpen={true} // Show the modal when selectedVehicle has data
          onClose={handleEditModalClose}
          vehicleData={selectedVehicle}
          isOn={isOn} // Pass the isOn prop to EditModal
        />
      )}
    </div>
  );
}

export default RegistrationPage;
