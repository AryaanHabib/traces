// src/pages/RouteTracker.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RouteTracker = () => {
  const [watchID, setWatchID] = useState(null);
  const [status, setStatus] = useState("Status: Waiting to start tracking...");
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [map, setMap] = useState(null);
  const [polyline, setPolyline] = useState(null);
  const [marker, setMarker] = useState(null);

  const MIN_DISTANCE = 2;
  const ACCURACY_THRESHOLD = 100;
  const STEP_LENGTH = 0.78;

  const navigate = useNavigate();

  const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3;
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lng2 - lng1) * (Math.PI / 180);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const initMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
            center: userLocation,
            zoom: 15,
          });

          const polylineInstance = new window.google.maps.Polyline({
            path: routeCoordinates,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 6,
          });
          polylineInstance.setMap(mapInstance);

          const markerInstance = new window.google.maps.Marker({
            position: userLocation,
            map: mapInstance,
            title: "Starting Point",
          });

          setMap(mapInstance);
          setPolyline(polylineInstance);
          setMarker(markerInstance);
          setRouteCoordinates([userLocation]);
          setStatus("Status: Ready to track your movement.");
        },
        (error) => {
          console.error("Error fetching location: ", error);
          alert("Unable to fetch your current location. Please allow location access.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const startTracking = () => {
    setStatus("Status: Tracking your movement...");
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const accuracy = position.coords.accuracy;
        const newLatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        if (accuracy > ACCURACY_THRESHOLD) {
          setStatus("Status: Weak GPS signal. Try moving to an open area.");
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
          const newDistance = routeCoordinates.length
            ? getDistance(
                routeCoordinates[routeCoordinates.length - 1].lat,
                routeCoordinates[routeCoordinates.length - 1].lng,
                newLatLng.lat,
                newLatLng.lng
              )
            : 0;
          setTotalDistance((prevDistance) => prevDistance + newDistance);

          setRouteCoordinates((prevCoordinates) => {
            const updatedCoordinates = [...prevCoordinates, newLatLng];
            polyline.setPath(updatedCoordinates);
            map.setCenter(newLatLng);
            return updatedCoordinates;
          });
        }
      },
      (error) => {
        console.error("Error during tracking: ", error);
        alert("Tracking error. Please try again.");
      },
      { enableHighAccuracy: true }
    );

    setWatchID(watchId);
  };

  const stopTrackingHandler = () => {
    setStatus("Status: Tracking stopped.");

    if (watchID) {
      navigator.geolocation.clearWatch(watchID);
      setWatchID(null);

      const steps = Math.round(totalDistance / STEP_LENGTH);

      // Navigate to the AttemptResults page with the route coordinates and total steps
      navigate("/attempt-results", {
        state: { coordinates: routeCoordinates, steps: steps },
      });
    }
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <div>
      <div id="controls">
        <button onClick={startTracking} disabled={watchID !== null}>
          Start Tracking
        </button>
        <button onClick={stopTrackingHandler} disabled={watchID === null}>
          Stop Tracking
        </button>
      </div>
      <div id="status">{status}</div>
      <div id="map" style={{ height: "80vh", width: "100%" }}></div>
    </div>
  );
};

export default RouteTracker;
