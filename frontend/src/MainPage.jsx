//import { FaLocationArrow } from "react-icons/fa";
import Bar from "./Bar";
import SideBar from "./SideBar";
import { useEffect, useRef } from "react";
import "./App.css";
import { useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

function MainPage() {
  const mapElement = useRef();

  const [map, setMap] = useState({});

  const [latitude, setLatitude] = useState(6.6885);
  const [longitude, setLongitude] = useState(-1.6244);
  useEffect(() => {
    let map = tt.map({
      key: "tGs7nOkNWSZKSWIBx3Ln2m7ZM4QN26ix",
      container: mapElement.current,
      stylesVisibility: { trafficIncidents: true, trafficFlow: true },
      center: [longitude, latitude],
      zoom: 10,
    });
    setMap(map);
    const addMarker = () => {
      const element = document.createElement("div");
      element.classList.add(
        "bg-cover",
        "h-[22px]",
        "w-[22px]",
        "bg-yellow",
        "border",
        "rounded-lg",
        "border-solid-gray"
      );
      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);
      marker.on("dragend", () => {
        const lnglat = marker.getLngLat();
        setLongitude(lnglat.lng);
        setLatitude(lnglat.lat);
      });
    };
    addMarker();
    return () => map.remove();
  }, [latitude, longitude]);
  return (
    <div>
      <div className="flex  justify-center items-center h-screen w-full ">
        <div className=" overflow-hidden   h-screen w-full ">
          <div className="flex  h-20 p-4 justify-between text-xl shadow-sm bg-gray-100 text-g3 opacity-1 ">
            <h1 className=" font-semibold justify-start text-2xl">BinBuddy</h1>
            <SideBar />
          </div>
          <div className="flex h-[520px] border justify-end items-baseline">
            <div ref={mapElement} className="h-[400px]" />
            <div>
              <h1>Where to?</h1>
              <input
                type="text"
                id="longitude"
                placeholder="Put in longitude"
                onChange={(e) => {
                  setLongitude(e.target.value);
                }}
              />
              <input
                type="text"
                id="latitude"
                placeholder="Put in latitude"
                onChange={(e) => {
                  setLatitude(e.target.value);
                }}
              />
            </div>
          </div>
          {/* <button className="fixed z-90 bottom-5  right-3 bg-g3 w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-g2 duration-300"></button> */}
          <Bar />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
