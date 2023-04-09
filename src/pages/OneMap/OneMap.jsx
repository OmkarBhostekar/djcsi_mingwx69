import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import "./OneMap.css";
// import geoJson from "./data.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoibG9ncmFzc285NiIsImEiOiJjanUzZ2cxNW0wMmtoM3pvMmtzb2w4ZGJuIn0.zqK9cllpLJugxixeSqOKGQ";

const OneMap = () => {
  const mapContainerRef = useRef(null);

  const [users , setUsers] = useState({
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [72.83717280425874, 19.107598810790055],
            },
            properties: {
                id: '1',
                name: 'Omkar',
                age: '12',
                lat: '41.84',
                long: '-87.65',
            },
        }
    ],
  });

    const staticLoc = [
        [19.107598810790055, 72.83717280425874],
        [-86.65, 40.84],
        [-85.65, 39.84],
        [-84.65, 38.84],
    ]

  // fetch users from api and convert it to geojson
    const fetchUsers = async () => {
        const data = JSON.parse(localStorage.getItem('usersForMap')) || [];
        const geoJson = {
            type: 'FeatureCollection',
            features: data.map((user, index) => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: staticLoc[index],
                },
                properties: {
                    id: user._id,
                    name: user.name,
                    age: user.age,
                    lastUsed: user.lastUsed,
                    lastLocation: user.lastLocation,
                },
            })),
        };
        setUsers(geoJson);
    };



  // Initialize map when component mounts...
  useEffect(() => {
    fetchUsers();
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [72.83717280425874, 19.107598810790055],
      zoom: 10,
    });

    // Create default markers
    users.features.map((feature) =>
      new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map)
    );

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return (
  <div className="map-container-wrapper-2">
    <h1>Track Your childrens!</h1>
    <div className="map-container" ref={mapContainerRef} />
  </div>
  )
};

export default OneMap;