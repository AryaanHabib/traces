import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RouteTracker = () => {
  const { state } = useLocation();
  const { challenge } = state || {};
  const dummyTime = 600; // Dummy timer value in seconds

  const [watchID, setWatchID] = useState(null);
  const [status, setStatus] = useState("Status: Waiting to start tracking...");
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [map, setMap] = useState(null);
  const [polyline, setPolyline] = useState(null);
  const [marker, setMarker] = useState(null);
  const [timeLeft, setTimeLeft] = useState(dummyTime);
  const [isTracking, setIsTracking] = useState(false);

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
    setIsTracking(true);

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

  const stopTracking = () => {
    if (watchID) {
      navigator.geolocation.clearWatch(watchID);
      setWatchID(null);
    }
    setIsTracking(false);

    const steps = Math.round(totalDistance / STEP_LENGTH);

    // Navigate to the AttemptResults page
    navigate("/attempt-results", {
      state: { coordinates: routeCoordinates, steps: steps, timeTaken: dummyTime - timeLeft },
    });
  };

  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    if (!isTracking) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          stopTracking();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTracking]);

  return (
    <div style={{ position: "relative" }}>
      <div id="map" style={{ height: "100vh", width: "100%" }}></div>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
          background: "rgba(255, 255, 255, 0.8)",
          padding: "10px",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "18px", marginBottom: "10px" }}>Timer: {timeLeft}s</div>
        <button
          onClick={startTracking}
          disabled={watchID !== null}
          style={{
            padding: "10px 20px",
            marginBottom: "5px",
            borderRadius: "5px",
            backgroundColor: watchID !== null ? "#ccc" : "#4CAF50",
            color: "#fff",
            border: "none",
            fontSize: "16px",
          }}
        >
          Start Tracking
        </button>
        <button
          onClick={stopTracking}
          disabled={!watchID}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: watchID ? "#f44336" : "#ccc",
            color: "#fff",
            border: "none",
            fontSize: "16px",
          }}
        >
          Stop Tracking
        </button>
      </div>
    </div>
  );
};

export default RouteTracker;
