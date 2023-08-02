import { useState } from "react";
import Dashboard from "./Dashboard";
import { client } from "../apiEndpoints/endpoints";

function AnnouncementsPage() {
  const [announcement, setAnnouncement] = useState("");
  const [announcementsList, setAnnouncementsList] = useState([]);
  const [targetAudience, setTargetAudience] = useState("customers");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add the announcement to the announcementsList state
    setAnnouncementsList((prevAnnouncements) => [
      ...prevAnnouncements,
      announcement,
    ]);
    // Clear the input field after submitting
    setAnnouncement("");

    // Make a POST request to the backend API using 'client.post'
    try {
      await client.post("/SendMessage", {
        message: announcement,
        targetAudience: targetAudience,
      });
      console.log("Announcement sent successfully!");
    } catch (error) {
      console.error("Error sending the announcement:", error);
    }
  };

  const handleDelete = (index) => {
    // Remove the announcement from the announcementsList state based on the index
    setAnnouncementsList((prevAnnouncements) =>
      prevAnnouncements.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="flex flex-row h-screen w-full">
      <Dashboard />
      <div className="h-screen w-full overflow-hidden">
        <div className="bg-g1 h-[200px]">
          <div className="flex  justify-center p-4  w-full">
            <h1 className="font-semibold text-3xl text-g4">Announcements</h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex justify-center p-4 w-full"
          >
            <input
              type="text"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              placeholder="Announcements"
              className="rounded-none w-[400px] text-center h-10"
            />
            <div className="flex items-center">
              <label htmlFor="customers" className="mr-2">
                Customers
              </label>
              <input
                type="radio"
                name="targetAudience"
                value="customers"
                checked={targetAudience === "customers"}
                onChange={() => setTargetAudience("customers")}
                className="mr-4"
              />
              <label htmlFor="drivers" className="mr-2">
                Drivers
              </label>
              <input
                type="radio"
                name="targetAudience"
                value="drivers"
                checked={targetAudience === "drivers"}
                onChange={() => setTargetAudience("drivers")}
                className="mr-4"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-g3 text-white rounded-md"
            >
              Send
            </button>
          </form>
        </div>

        <div className="p-4 w-full flex  flex-col items-center justify-center ">
          {announcementsList.map((item, index) => (
            <div
              key={index}
              className="bg-white p-2 my-2 rounded-sm shadow-md flex justify-between items-center w-[550px] "
            >
              <div>{item}</div>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-600 font-bold hover:text-red-800"
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnnouncementsPage;
