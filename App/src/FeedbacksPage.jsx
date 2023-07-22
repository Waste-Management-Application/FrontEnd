import Dashboard from "./Dashboard";

function FeedbacksPage() {
  return (
    //full container for page content
    <div className="flex flex-row h-screen w-full ">
      <Dashboard />
      {/* container for right side */}
      <div className="h-screen w-full bg-gray-100 overflow-hidden">
        <div className="flex justify-between p-4 m-4 w-full">
          <h1 className="font-semibold text-3xl text-g4">Feedbacks</h1>
        </div>
      </div>
    </div>
  );
}

export default FeedbacksPage;
