import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import AddDriverModal from "./AddDriverModal";
import {client} from "../../apiEndpoints/endpoints.js";

function CustomersPage() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getData = async () => {
    await client
      .get("customers")
      .then((res) => {
        const rawData = res.data.data.customers; // Access the customers array correctly
        const processedData = rawData.map((customer) => {
          const { _id, role, __v, passwordChangedAt, DateRegistered, firstName, lastName, email, contact, gender, passwordResetExpires, passwordResetToken } = customer;
          return {  id: _id,DateRegistered, contact,location, email, gender, name: `${firstName} ${lastName}` };
        });
        setData(processedData);
        setFilter(processedData); // Initialize filter with the processed data
      });
  };
  
  useEffect(() => {
    getData();
  }, []);

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
      field: "gender",
      headerName: "Gender",
      width: 120,
    },
    {
      field: "DateRegistered",
      headerName: "Date Registered",
      width: 200,
      valueGetter: (params) => {
        // Assuming the "requestDate" field is in ISO date format
        const DateRegistered = new Date(params.row.DateRegistered);
        return DateRegistered.toLocaleString(); // Format the date as per your requirements
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
            placeholder="Search"
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
      <AddDriverModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default CustomersPage;
