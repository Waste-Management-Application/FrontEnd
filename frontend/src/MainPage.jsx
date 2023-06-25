//import { FaLocationArrow } from "react-icons/fa";
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
    console.log("the line is drawn");
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

  const addDeliveryMarker = (lnglat, map) => {
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
    new tt.Marker({ element: element }).setLngLat(lnglat).addTo(map);
  };

  useEffect(() => {
    const destinations = [
      { lng: -0.19089115399796697, lat: 5.605254367144667 },
      { lng: -0.1941527201592237, lat: 5.606535670005371 },
      { lng: -0.1970709635672847, lat: 5.606920060315559 },
      { lng: -0.20054710645158025, lat: 5.605809598729792 },
      { lng: -0.20153415936820807, lat: 5.60914097714803 },
      { lng: -0.20342243451548825, lat: 5.61149001459691 },
      { lng: -0.20470989484229563, lat: 5.614180718593346 },
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
      zoom: 14,
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

    map.on("click", (e) => {
      destinations.push(e.lngLat);
      console.log(destinations);
      addDeliveryMarker(e.lngLat, map);
      recalculatedRoutes();
    });
    return () => map.remove();
  }, [latitude, longitude]);
  return (
    <div>
      <div className="flex  justify-center items-center h-screen w-full ">
        <div className=" overflow-hidden   h-screen w-full ">
          <div className="flex border rounded-b-xl h-20 p-4 justify-between text-xl shadow-sm bg-g3 text-white opacity-1 ">
            <h1 className=" font-semibold justify-start text-2xl">BinBuddy</h1>
            <SideBar />
          </div>
          <div className=" h-[600px] z-10">
            {map && (
              <div>
                <div ref={mapElement} className="h-[600px]" />
              </div>
            )}
            <div></div>
          </div>
          {/* <button className="fixed z-90 bottom-5  right-3 bg-g3 w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-g2 duration-300"></button> */}
          <Bar />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
