import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { client } from "../apiEndpoints/endpoints";

function FeedbacksPage() {
  const [complaints, setComplaints] = useState([]); // Initialize complaints state as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make the API call to fetch the complaints data
    setLoading(true);
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      // Replace 'your-api-endpoint' with the actual endpoint for fetching complaints
      const response = await client.get("/feedback/");
      const responseData = response.data.data;
      const complaintsArray = Array.isArray(responseData)
        ? responseData
        : [responseData]; // Wrap the data in an array if not already an array
      setComplaints(complaintsArray);
      console.log(complaints);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row h-screen w-full ">
      <Dashboard />
      <div className="h-screen overflow-auto w-full">
        <div className="flex justify-between p-4  w-full">
          <h1 className="font-semibold text-3xl text-g4">Feedbacks</h1>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : complaints.length > 0 ? (
          <div className=" flex flex-col border-none bg-gray-50 justify-center items-center">
            {complaints.map((complaint, i) => {
              const customerName = complaint.customer
                ? `${complaint.customer.firstName} ${complaint.customer.lastName}`
                : "Unknown"; // Set a default value for customer name if customer is undefined

              return (
                <div
                  className=" flex flex-row mx-7 my-4 h-[100px] w-[600px]  overflow-clip"
                  key={i}
                >
                  <div className="h-full w-full ">
                    {/* Format and display the Datesent */}
                    <h1 className="text-gray-400">
                      {new Date(complaint.DateSent).toLocaleString()}
                    </h1>
                    {/* Or use another date formatting library if desired */}
                    {/* Display the starsNo as a rating using the Rating component */}
                  </div>
                  <div className="h-full w-full">
                    <div className="h-10 w-full">
                      <h1 className="text-md font-bold">{customerName}</h1>
                    </div>
                    <div className="h-full w-full ">
                      <h1 className="text-gray-400">{complaint.message}</h1>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}

export default FeedbacksPage;
