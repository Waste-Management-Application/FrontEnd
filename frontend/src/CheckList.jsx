import { useState, useEffect, useMemo } from "react";
import Bar from "./Bar";
import SideBar from "./SideBar";
import { TbCheck } from "react-icons/tb";

function CheckList() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isAtDestination, setIsAtDestination] = useState(false);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        console.error("Error retrieving user's location:", error);
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [latitude, longitude]);

  const destinations = useMemo(
    () => [
      { lng: -1.5665604513100675, lat: 6.668418037631255 },
      { lng: -1.5682953, lat: 6.6688763 },
      { lng: -1.5666462819983735, lat: 6.666606471200865 },
      { lng: -1.56760360405886, lat: 6.669446982230852 },
      { lng: -1.566841291095102, lat: 6.672673497095971 },
      { lng: -1.5655972313527116, lat: 6.674723454182086 },
    ],
    []
  );

  useEffect(() => {
    const isAtDestination = destinations.some(
      (destination) =>
        destination.lat === latitude && destination.lng === longitude
    );
    setIsAtDestination(isAtDestination);
  }, [latitude, longitude, destinations]);

  return (
    <div>
      <div className="flex relative justify-center items-center h-screen w-full ">
        <div className={`overflow-hidden rounded-3xl  h-screen w-full  `}>
          <div className="flex  h-20 p-4 justify-between text-xl border shadow-sm bg-gray-100 text-g3 opacity-1 ">
            <h1 className=" font-semibold justify-start text-2xl">BinBuddy</h1>
            <SideBar />
          </div>
          <div className="flex justify-center items-center font-semibold text-lg text-g3 ">
            <h1>Tick when a task is completed</h1>
          </div>
          <div className="flex h-[70%] w-full overflow-auto">
            <div className=" my-10 h-[60%] border  w-screen ">
              <ul>
                {destinations.map((info, i) => (
                  <div
                    key={i}
                    className="flex h-20 border  w-fill m-4 shadow-md"
                  >
                    <div className="h-fill w-[70%] border ">
                      <p>Task {i}</p>
                    </div>
                    <div className="flex justify-center items-center h-fill w-[30%] ">
                      <div className="flex items-center">
                        <TbCheck className="border h-7 w-auto border-white bg-g2 rounded-full text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>

          <Bar />
        </div>
      </div>
    </div>
  );
}

export default CheckList;
