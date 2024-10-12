// src/DistanceCalculator.js

import React, { useEffect, useState } from 'react';

// Haversine formula to calculate distance between two coordinates
const haversineDistance = (coords1, coords2) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const lat1 = coords1.latitude;
  const lon1 = coords1.longitude;
  const lat2 = coords2.latitude;
  const lon2 = coords2.longitude;

  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const DistanceCalculator = ({ selectedPlace }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [miledistance, setMilesDistance] = useState(null);

  // Standard travel rate per mile
  const travelRatePerMile = 1.5; // Example rate in your currency

  // Function to convert kilometers to miles
  const kmToMiles = (km) => {
      return km * 0.621371; // 1 km is approximately 0.621371 miles
  };

// alert(selectedPlace)
  const places = {
    "Agra_Fort": {latitude: 27.1753, longitude: 78.0422},
    "Ajanta_Ellora_Caves": {latitude: 20.5294, longitude: 75.7033},
    "Amer_Fort": {latitude: 26.9855, longitude: 75.8513},
    "Bara_Imambara": {latitude: 26.8468, longitude: 80.9490},
    "Basilica_of_Bom_Jesus": {latitude: 15.5520, longitude: 73.7518},
    "Bhimbetka": {latitude: 23.2557, longitude: 77.4376},
    "Brihadisvara_Temple": {latitude: 10.7906, longitude: 79.1374},
    "Burj": {latitude: 25.1972, longitude: 55.2744},
    "Charminar": {latitude: 17.3616, longitude: 78.4747},
    "City_Palace": {latitude: 26.9258, longitude: 75.8250},
    "Dilwara_Temples": {latitude: 25.5840, longitude: 72.6356},
    "Eiffel_Tower": {latitude: 48.8584, longitude: 2.2945},  // Not in India
    "Elephanta_Caves": {latitude: 18.9939, longitude: 72.9156},
    "Fatehpur_Sikri": {latitude: 27.1008, longitude: 78.6545},
    "Gateway_of_India": {latitude: 18.9215, longitude: 72.8347},
    "Gingee_Fort": {latitude: 12.2984, longitude: 79.3621},
    "Golconda_Fort": {latitude: 17.3840, longitude: 78.4010},
    "Golden_Temple": {latitude: 31.6200, longitude: 74.8768},
    "Gwalior_Fort": {latitude: 26.2182, longitude: 78.1829},
    "Hampi": {latitude: 15.3352, longitude: 76.4602},
    "Hawa_Mahal": {latitude: 26.9290, longitude: 75.8258},
    "Hill_Palace_Museum": {latitude: 10.0243, longitude: 76.3372},
    "Humayuns_Tomb": {latitude: 28.5930, longitude: 77.2505},
    "India_Gate": {latitude: 28.6129, longitude: 77.2295},
    "Jaisalmer_Fort": {latitude: 26.9124, longitude: 70.9164},
    "Jama_Masjid": {latitude: 28.6508, longitude: 77.2330},
    "Jantar_Mantar": {latitude: 26.9253, longitude: 75.8253},
    "Kamakhya_Temple": {latitude: 26.1139, longitude: 91.5822},
    "Kashi_Vishwanath": {latitude: 25.3176, longitude: 82.9739},
    "Key_Monastery_Spiti_Valley": {latitude: 32.1977, longitude: 78.4744},
    "Khajuraho_Temples": {latitude: 24.8346, longitude: 79.9339},
    "Lotus_Temple": {latitude: 28.5535, longitude: 77.2587},
    "Mahabalipuram": {latitude: 12.6192, longitude: 80.1940},
    "Mahabodhi_Temple": {latitude: 24.6950, longitude: 84.9929},
    "Meenakshi_Temple": {latitude: 9.9195, longitude: 78.1194},
    "Mehrangarh_Fort": {latitude: 26.2964, longitude: 73.2869},
    "Mysore_Palace": {latitude: 12.3051, longitude: 76.6558},
    "Nalanda": {latitude: 25.2753, longitude: 85.0068},
    "Pattadakal": {latitude: 15.9464, longitude: 75.9745},
    "Purana_Qila": {latitude: 28.6105, longitude: 77.2286},
    "Qutub_Minar": {latitude: 28.5216, longitude: 77.1855},
    "Rashtrapati_Bhawan": {latitude: 28.6139, longitude: 77.1850},
    "Red_Fort": {latitude: 28.6562, longitude: 77.2410},
    "Sanchi_Stupa": {latitude: 23.1856, longitude: 77.7150},
    "Se_Cathedral": {latitude: 15.5057, longitude: 73.9147},
    "Shivaji_Terminus": {latitude: 18.9406, longitude: 72.8354},
    "Sikandra_Agra": {latitude: 27.1778, longitude: 78.0082},
    "Sun_Temple": {latitude: 20.2916, longitude: 85.8250},
    "Taj_Mahal": {latitude: 27.1751, longitude: 78.0421},
    "Victoria_Memorial": {latitude: 22.5445, longitude: 88.3426},
    // Add other places as needed
  };

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCurrentLocation(coords);
        }, (error) => {
          console.error("Error getting location:", error);
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    // alert(`Selected Place: ${selectedPlace}---${currentLocation}---${places[selectedPlace]}`);
    if (currentLocation && selectedPlace && places[selectedPlace]) {
      const distanceToPlace = haversineDistance(currentLocation, places[selectedPlace]);
      setDistance(distanceToPlace);
      
      const miles = kmToMiles(distance);
      const cost = miles * travelRatePerMile;
      setMilesDistance(miles);
        
      setTotalCost(cost);
    }
  }, [currentLocation, selectedPlace, places]);

  return (
    <div>
      {/* <h2>Distance from Your Location</h2> */}
      {currentLocation ? (
        distance !== null ? (
          <p>
            <h2>Distance to {selectedPlace}: {miledistance.toFixed(2)} ml and Total Estimated Cost: ${totalCost.toFixed(2)}</h2>
          </p>
        ) : (
          <p>Select a place to calculate the distance.</p>
        )
      ) : (
        <p>Getting your location...</p>
      )}
    </div>
  );
};

export default DistanceCalculator;
