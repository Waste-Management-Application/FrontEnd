import Bar from "./Bar";
import SideBar from "./SideBar";
import { useEffect, useRef } from "react";
import "./App.css";
import { useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import ttapi from "@tomtom-international/web-sdk-services";
import { client } from "../apiEndpoints/endpoints.js";

function MainPage() {
  const mapElement = useRef();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [open, setOpen] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const toggle = () => {
    setOpen(!open);
  };

  const [map, setMap] = useState({});

  navigator.geolocation.watchPosition((position) => {
    const { latitude, longitude } = position.coords;
    setLatitude(latitude);
    setLongitude(longitude);
  });

  const convertToPoints = (lnglat) => {
    return {
      point: {
        latitude: lnglat.lat,
        longitude: lnglat.lng,
      },
    };
  };

  const drawRoute = (geoJson, map) => {
    if (map.getLayer("route")) {
      map.removeLayer("route");
      map.removeSource("route");
    }
    map.addLayer({
      id: "route",
      type: "line",
      source: { type: "geojson", data: geoJson },
      paint: { "line-color": "gray", "line-width": 2 },
    });
  };

  const addLocationMarkers = (destinations, map) => {
    if (!destinations || destinations.length === 0) {
      return; // Handle the case when destinations is undefined or empty
    }

    destinations.forEach((destination) => {
      const { lng, lat } = destination;
      const element = document.createElement("div");
      element.className = "marker";
      new tt.Marker({ element: element }).setLngLat([lng, lat]).addTo(map);
    });
  };

  useEffect(() => {
    // Decode the token to get the user ID
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Authentication token not found.");
        return;
      }

      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.id;

      // Call a function to update the driver's location in the backend
      if (latitude !== null && longitude !== null) {
        saveDriverLocation(userId, latitude, longitude);
      }

      // Rest of your useEffect logic...
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, [latitude, longitude]);

  const saveDriverLocation = async (userId, lat, lng) => {
    try {
      // Make an HTTP POST request to your backend endpoint
      const response = await client.post("/UpdateDriverLocation", {
        id: userId, // Pass the user ID to the backend API
        latitude: lat,
        longitude: lng,
      });

      // Check the response status and handle accordingly
      if (response.status === 200) {
        console.log("Driver location saved successfully");
      } else {
        console.error("Error saving driver location:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving driver location:", error);
    }
  };

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

    const origin = {
      lat: latitude,
      lng: longitude,
    };

    let map = tt.map({
      key: "tGs7nOkNWSZKSWIBx3Ln2m7ZM4QN26ix",
      container: mapElement.current,
      stylesVisibility: { trafficIncidents: true, trafficFlow: true },
      center: [longitude, latitude],
      zoom: 16,
      pitch: 45,
    });

    setMap(map);

    const addMarker = () => {
      // const popupOffset = {
      //   bottom: [0, -25],
      // };
      // const popup = new tt.Popup({ offset: popupOffset }).setHTML(
      //   "this is you"
      // );
      const element = document.createElement("div");
      element.className = "driver";
      const marker = new tt.Marker({
        draggable: false,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);
      // marker.on("dragend", () => {
      //   const lnglat = marker.getLngLat();
      //   setLongitude(lnglat.lng);
      //   setLatitude(lnglat.lat);

      //    // Send the driver's location to the backend API
      //    saveDriverLocation(lnglat.lat, lnglat.lng);

      // });
      // marker.setPopup(popup).togglePopup();
    };

    addMarker();

    addLocationMarkers(destinations, map);
    fetchCustomers();

    const sortDestinations = (locations) => {
      const pointsForDestinations = locations.map((destination) => {
        return convertToPoints(destination);
      });

      const callParameters = {
        key: "tGs7nOkNWSZKSWIBx3Ln2m7ZM4QN26ix",
        destinations: pointsForDestinations,
        origins: [convertToPoints(origin)],
      };

      return new Promise((resolve, reject) => {
        ttapi.services
          .matrixRouting(callParameters)
          .then((matrixAPIResults) => {
            const results = matrixAPIResults.matrix[0];
            const resultsArray = results.map((result, index) => {
              const drivingTime =
                result.response.routeSummary?.travelTimeInSeconds || 0;
              return {
                location: locations[index],
                drivingtime: drivingTime,
              };
            });
            resultsArray.sort((a, b) => a.drivingtime - b.drivingtime);
            const sortedLocations = resultsArray.map(
              (result) => result.location
            );
            resolve(sortedLocations);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };

    const recalculatedRoutes = () => {
      if (latitude !== null && longitude !== null) {
        sortDestinations(destinations).then((sorted) => {
          sorted.unshift(origin);

          ttapi.services
            .calculateRoute({
              key: "tGs7nOkNWSZKSWIBx3Ln2m7ZM4QN26ix",
              locations: sorted,
            })
            .then((routeData) => {
              const geoJson = routeData.toGeoJson();
              drawRoute(geoJson, map);
            });
        });
      }
    };

    recalculatedRoutes();

    return () => map.remove();
  }, [latitude, longitude]);

  return (
    <div>
      {open && <div className="fixed inset-0  backdrop-blur-md z-50"></div>}
      <div className="flex  justify-center items-center h-screen w-full ">
        <div className=" overflow-hidden   h-screen w-full ">
          <div className="flex border rounded-b-xl h-20 p-4 justify-between text-xl shadow-sm bg-g3 text-white opacity-1 ">
            <h1 className=" font-semibold justify-start text-2xl">BinBuddy</h1>
            <SideBar toggle={toggle} open={open} />
          </div>
          <div className=" h-full z-10">
            {map && (
              <div>
                <div ref={mapElement} className="h-[600px] z-10" />
              </div>
            )}
          </div>

          <Bar />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
