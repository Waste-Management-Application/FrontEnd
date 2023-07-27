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
  const [searchInput, setSearchInput] = useState(""); // Add the missing searchInput state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState("");

  const getRequests = async (requestType) => {
    try {
      const response = await client.get(requestType);
      const responseData = response.data.data.map((row) => ({
        id: row._id,
        number: isOn ? row.dustbinNo : row.vehicleNo,
        date: row.DateCreated,
      }));

      setData(responseData);
      setFilter(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setUser("Registration"); // Assuming you want to show "Registration" in the modal for this page
    setLoading(true);
    if (isOn) {
      getRequests("/dustbin");
    } else {
      getRequests("/vehicle");
    }
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
              className={`w-12 h-6 rounded-full ${
                isOn ? "bg-g2" : "bg-g3"
              }`}
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
            <span className="ml-2">
            {isOn ? "Bins" : "Vehicles"}
            </span>
          </div>
          <input
            type="text"
            className="border border-g2 rounded-lg"
            onChange={handleFilter}
            placeholder="Search by number"
          />
        </div>
        {/* Conditional rendering: Render DataGrid only if data is available */}
        <div className="h-[500px]">
          {data.length > 0 && (
            <DataGrid columns={columns} rows={filter} pageSize={1} />
          )}
        </div>
      </div>
      {/* Render RegistrationModal component */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={user}
        isOn={isOn}
      />
    </div>
  );
}

export default RegistrationPage;
