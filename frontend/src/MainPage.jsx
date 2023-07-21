import Bar from "./Bar";
import SideBar from "./SideBar";
import { useEffect, useRef } from "react";
import "./App.css";
import { useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import ttapi from "@tomtom-international/web-sdk-services";

function MainPage() {
  const mapElement = useRef();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };

  const [map, setMap] = useState({});
  const [isAtDestination, setIsAtDestination] = useState(false);

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
      element.classList.add(
        "bg-cover",
        "h-[8px]",
        "w-[8px]",
        "bg-[blue]",
        "border",
        "rounded-lg",
        "border-solid-gray"
      );
      new tt.Marker({ element: element }).setLngLat([lng, lat]).addTo(map);
    });
  };

  useEffect(() => {
    const destinations = [
      { lng: -1.5665604513100675, lat: 6.668418037631255 },
      { lng: -1.5682787, lat: 6.6688801 },
      { lng: -1.5666462819983735, lat: 6.666606471200865 },
      { lng: -1.56760360405886, lat: 6.669446982230852 },
      { lng: -1.566841291095102, lat: 6.672673497095971 },
      { lng: -1.5655972313527116, lat: 6.674723454182086 },
    ];

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
      const popupOffset = {
        bottom: [0, -25],
      };
      const popup = new tt.Popup({ offset: popupOffset }).setHTML(
        "this is you"
      );
      const element = document.createElement("div");
      element.classList.add(
        "bg-cover",
        "h-[22px]",
        "w-[10px]",
        "bg-[yellow]",
        "border",
        "rounded-2xl",
        "border-solid-gray",
        "shadow-3xl"
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
      marker.setPopup(popup).togglePopup();
    };

    addMarker();

    addLocationMarkers(destinations, map);

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

          const isAtDestination = sorted.some(
            (location) =>
              location.lat === latitude && location.lng === longitude
          );

          setIsAtDestination(isAtDestination);

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

    map.on("click", (e) => {
      destinations.push(e.lngLat);
      addLocationMarkers(destinations, map);
      recalculatedRoutes();
    });
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
          <div className=" h-[700px] z-10">
            {map && (
              <div>
                <div ref={mapElement} className="h-[650px] z-10" />
                {isAtDestination && (
                  <div className="bg-white p-2 mt-4 rounded-md shadow-md">
                    You are at a destination.
                  </div>
                )}
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
