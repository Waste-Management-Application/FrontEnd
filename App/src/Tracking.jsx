import { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import Dashboard from "./Dashboard";
import axios from "axios";
import { client } from "../../apiEndpoints/endpoints";

function Tracking() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await client.get("/customers");
        const customersFromBackend = response.data.data.customers;
        const destinationsFromBackend = customersFromBackend.map((customer) => {
          const { coordinates } = customer.location;
          return { lng: coordinates[0], lat: coordinates[1] };
        });
        setDestinations(destinationsFromBackend);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
  
    // Watch user's geolocation for updates
    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
    });
  
    // Fetch customer data and set destinations
    fetchCustomers();
  
    // Clean up watch when component unmounts
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    const mapboxToken = "pk.eyJ1IjoiZGFiYXJkZW4iLCJhIjoiY2xrZmQzY3MyMGMzbTNzbzVydWM0d3ZueCJ9.BtD3WGO5D3C8fbfCDyDlhg";
    mapboxgl.accessToken = mapboxToken;
  
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [longitude, latitude],
      zoom: 18,
    });
  
    // Add a marker for the user's location
    if (latitude && longitude) {
      new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
    }
  
    // Add markers for customer destinations
    destinations.forEach((destination) => {
      const { lng, lat } = destination;
      new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
    });

    // Clean up on unmount
    return () => map.remove();
  }, [latitude, longitude, destinations]);

  useEffect(() => {
    // Watch user's geolocation for updates
    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
    });

    // Clean up watch when component unmounts
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="flex flex-row h-screen w-full ">
      <Dashboard />
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
