import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"];
const apiKey = "AIzaSyBNH1E0C9iti79tqWXYW14NwKp56EpdMCw"; // Replace with your API key

function MapTracking() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const [map, setMap] = useState(null);
  const [polyline, setPolyline] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [totalSteps, setTotalSteps] = useState(0);
  const [watchID, setWatchID] = useState(null);
  const MIN_DISTANCE = 2; // Minimum distance threshold in meters
  const ACCURACY_THRESHOLD = 100; // Relaxed accuracy threshold in meters

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return;

    const initMap = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          const mapInstance = new window.google.maps.Map(
            document.getElementById("map"),
            {
              center: userLocation,
              zoom: 15,
            }
          );

          const polylineInstance = new window.google.maps.Polyline({
            path: [],
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 6,
          });
          polylineInstance.setMap(mapInstance);

          new window.google.maps.Marker({
            position: userLocation,
            map: mapInstance,
            title: "Starting Point",
          });

          setMap(mapInstance);
          setPolyline(polylineInstance);
          setRouteCoordinates([userLocation]);
        },
        (error) => {
          console.error("Error fetching location: ", error);
          alert("Unable to fetch your current location. Please allow location access.");
        },
        { enableHighAccuracy: true }
      );
    };

    initMap();
  }, [isLoaded]);

  const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lng2 - lng1) * (Math.PI / 180);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  const startTracking = () => {
    const id = navigator.geolocation.watchPosition(
      (position) => {
        const accuracy = position.coords.accuracy;
        const newLatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        if (accuracy > ACCURACY_THRESHOLD) {
          console.warn("Weak GPS signal. Ignoring this point.");
          return;
        }

        if (
          routeCoordinates.length === 0 ||
          getDistance(
            routeCoordinates[routeCoordinates.length - 1].lat,
            routeCoordinates[routeCoordinates.length - 1].lng,
            newLatLng.lat,
            newLatLng.lng
          ) > MIN_DISTANCE
        ) {
          const updatedCoordinates = [...routeCoordinates, newLatLng];
          setRouteCoordinates(updatedCoordinates);

          // Calculate and update total steps
          const newSteps = Math.floor(getDistance(
            routeCoordinates[routeCoordinates.length - 1]?.lat || newLatLng.lat,
            routeCoordinates[routeCoordinates.length - 1]?.lng || newLatLng.lng,
            newLatLng.lat,
            newLatLng.lng
          ));
          setTotalSteps((prevSteps) => prevSteps + newSteps);

          // Update polyline path
          if (polyline) {
            polyline.setPath(updatedCoordinates);
          }

          // Re-center map
          if (map) {
            map.setCenter(newLatLng);
          }
        }
      },
      (error) => {
        console.error("Error during tracking: ", error);
      },
      { enableHighAccuracy: true }
    );

    setWatchID(id);
  };

  const stopTracking = () => {
    if (watchID) {
      navigator.geolocation.clearWatch(watchID);
      setWatchID(null);

      // Navigate to AttemptResults page with stored data
      navigate("/attempt-results", {
        state: { coordinates: routeCoordinates, steps: totalSteps },
      });
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div id="controls">
        <button onClick={startTracking}>Start Tracking</button>
        <button onClick={stopTracking} disabled={!watchID}>
          Stop Tracking
        </button>
      </div>
      <div id="map" style={{ height: "80vh", width: "100%" }}></div>
    </div>
  );
}

export default MapTracking;
