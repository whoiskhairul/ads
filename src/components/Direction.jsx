import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

import Nav from './Nav.jsx';
mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN;

const MapWithDirections = () => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [12.9198454, 50.8263549], // Initial center coordinates
            zoom: 12,
        });

        const directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            // profile: 'mapbox/driving',
            controls: {
                inputs: true,
                instructions: false,
                profileSwitcher: true,
            },
        });

        map.addControl(directions, 'top-left');

        // Fetch directions
        const fetchDirections = async () => {
            try {
                const response = await fetch('http://localhost:8000/testing/direction/', {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}` // Replace with your actual authentication token
                    },
                });
                const data = await response.json();

                const { source, destination } = data;
                console.log(source, destination);

                // Use the Mapbox Directions API to get the route
                directions.setOrigin(source);
                directions.setDestination(destination);
            } catch (error) {
                console.error('Error fetching directions:', error);
            }
        };

        fetchDirections();

        return () => {
            map.remove();
        };
    }, []);

    return (
        <>
            <Nav />
            <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
        </>
    )
};

export default MapWithDirections;