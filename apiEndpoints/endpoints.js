import axios from "axios";

const uri = "https://binbuddy.onrender.com";
const client = axios.create({
  baseURL: `${uri}/api/BinBuddy`
});

const adminClient = axios.create({
  baseURL: `${uri}/api/BinBuddyAdmin`
});

// Function to include token in headers
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Retrieve the token from storage

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

adminClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Retrieve the token from storage

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Function to add a new driver
export const addDriver = async (driverData) => {
  try {
    const response = await client.post("/drivers", driverData);
    return response.data;
  } catch (error) {
    throw new Error("Error adding driver: " + error.message);
  }
};

// Function to add a new customer
export const addCustomer = async (customerData) => {
  try {
    const response = await client.post("/customers", customerData);
    return response.data;
  } catch (error) {
    throw new Error("Error adding customer: " + error.message);
  }
};


export { client, adminClient };


