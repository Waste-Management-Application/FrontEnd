import axios from "axios"; 


const client = axios.create({
    baseURL: "http://localhost:4000/api/BinBuddy"  
  });

const adminClient = axios.create({
    baseURL: "http://localhost:4000/api/BinBuddyAdmin" 
  });

// Function to include token in headers
const includeToken = (config) => {
  const token = localStorage.getItem("token"); // Retrieve the token from storage

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

client.interceptors.request.use(includeToken);
adminClient.interceptors.request.use(includeToken);


export default  client;
