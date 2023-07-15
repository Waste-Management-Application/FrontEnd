import axios from "axios"; 


const client = axios.create({
    baseURL: "http://localhost:4000/api/BinBuddy"  
  });

const adminClient = axios.create({
    baseURL: "http://localhost:4000/api/BinBuddyAdmin" 
  });

// module.exports = {client, adminClient};
