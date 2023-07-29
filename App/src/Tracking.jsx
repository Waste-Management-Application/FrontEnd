import { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
// import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import Dashboard from "./Dashboard";

function Tracking() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  navigator.geolocation.watchPosition((position) => {
    const { latitude, longitude } = position.coords;
    setLatitude(latitude);
    setLongitude(longitude);
  });
  const destinations = [
    { lng: -1.5665604513100675, lat: 6.668418037631255 },
    { lng: -1.5682787, lat: 6.6688801 },
    { lng: -1.5666462819983735, lat: 6.666606471200865 },
    { lng: -1.56760360405886, lat: 6.669446982230852 },
    { lng: -1.566841291095102, lat: 6.672673497095971 },
    { lng: -1.5655972313527116, lat: 6.674723454182086 },
  ];

  const addMarkers = (destinations, map) => {
    destinations.forEach((destination) => {
      const { lng, lat } = destination;

      new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
    });
    console.log("Marker");
  };
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZGFiYXJkZW4iLCJhIjoiY2xrZmQzY3MyMGMzbTNzbzVydWM0d3ZueCJ9.BtD3WGO5D3C8fbfCDyDlhg";
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [longitude, latitude], // starting position [lng, lat]
      zoom: 18, // starting zoom
    });
    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

    // Add the Mapbox GL Draw control for creating markers
    // import("@mapbox/mapbox-gl-draw").then((mapboxglDraw) => {
    //   // Add the Mapbox GL Draw control for creating markers
    //   const draw = new mapboxglDraw.Draw({
    //     displayControlsDefault: false,
    //     controls: {
    //       point: true,
    //       trash: true,
    //     },
    //   });
    //   map.addControl(draw);
    // });

    // Clean up on unmount
    // return () => map.remove();
    addMarkers(destinations, map);
  });

  return (
    <div className="flex flex-row h-screen w-full ">
      <Dashboard />
      {/* container for right side */}
      <div className="h-screen w-full bg-gray-100 overflow-hidden">
        <div className="m-4 w-full flex justify-between ">
          <h1 className="font-semibold text-3xl text-g4">Tracking</h1>
        </div>
        <div className="h-full w-[98%] border rounded-lg m-2">
          <div id="map" className="w-full h-full"></div>
        </div>
      </div>
    </div>
  );
}

export default Tracking;
