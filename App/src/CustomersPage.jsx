import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import AddDriverModal from "./AddDriverModal";
import { client } from "../../apiEndpoints/endpoints.js";

function CustomersPage() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState("");

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
          location, // The location object
        } = customer;

        const digitalAddress = location?.digitalAddress || "Unknown";

        return {
          id: _id,
          DateRegistered,
          contact,
          email,
          gender,
          name: `${firstName} ${lastName}`,
          location: digitalAddress, // Assign the digitalAddress to the location property
        };
      });

      setData(processedData);
      setFilter(processedData);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
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

  useEffect(() => {
    setUser("Customer");
  }, []);

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
        <div className="h-[500px]">
          {data.length > 0 && (
            <DataGrid columns={columns} rows={filter} pageSize={5} />
          )}
        </div>
      </div>
      <AddDriverModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={user}
      />
    </div>
  );
}

export default CustomersPage;
