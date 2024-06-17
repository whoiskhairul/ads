import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Link } from 'react-router-dom';

import Nav from '../components/Nav.jsx'


import '../App.css';


mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN;

const apiOptions = [
    { label: 'Show all', url: 'show_all', color: null }, // New option to show all data
    { label: 'Schulen', url: 'http://127.0.0.1:8000/api/schulen/', color: '#3c8f13' }, // Red
    { label: 'Schulsozialarbeit', url: 'http://127.0.0.1:8000/api/schulsozialarbeit/', color: '#00eaff' }, // Blue
    { label: 'Kindertageseinrichtungen', url: 'http://127.0.0.1:8000/api/kindertageseinrichtungen/', color: '#c90808' }, // Green

    { label: 'Jugendberufshilfen', url: 'http://127.0.0.1:8000/api/jugendberufshilfen/', color: '#000000' }, // Magenta
];

const Map = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null); // Reference to the map object
    const [selectedApi, setSelectedApi] = useState(null);

    useEffect(() => {
        // Initialize the map only once
        if (mapRef.current) return; // If mapRef.current is already set, do nothing
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [12.9198454, 50.8263549], // Initial center coordinates
            zoom: 12,
        });

        mapRef.current.on('load', () => {

            mapRef.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');
            mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
            mapRef.current.addControl(new mapboxgl.GeolocateControl(), 'bottom-right');

            mapRef.current.loadImage('/src/assets/kindertageseinrichtungen.png', (error, image) => {
                if (error) throw error;
                mapRef.current.addImage('Kindertageseinrichtungen', image);
            });

            mapRef.current.loadImage('/src/assets/schulen.png', (error, image) => {
                if (error) throw error;
                mapRef.current.addImage('schulen', image);
            });
            mapRef.current.loadImage('/src/assets/schulsozialarbeit.png', (error, image) => {
                if (error) throw error;
                mapRef.current.addImage('schulsozialarbeit', image);
            });

            // Initial fetch and add all layers on map load
            apiOptions.forEach(api => {
                if (api.url !== 'show_all') {
                    fetchGeoJsonData(api.url, api.color, api.label);
                }
            });
        });
    }, []);

    const applyOffset = (coordinates, index) => {
        const offset = 0.00015; // Adjust the offset value as needed
        return [
            coordinates[0] + offset * (index % 2 === 0 ? 1 : -1),
            coordinates[1] + offset * (index % 2 === 0 ? 1 : -1),
        ];
    };

    const fetchGeoJsonData = async (url, color, sourceId) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)

            // Apply offset to each point's coordinates
            // data.features.forEach((feature, index) => {
            //     feature.geometry.coordinates = applyOffset(feature.geometry.coordinates, index);
            // });

            if (mapRef.current.getSource(sourceId)) {
                mapRef.current.getSource(sourceId).setData(data);
                mapRef.current.setPaintProperty(sourceId, 'circle-color', color);
            } else {
                // Add a GeoJSON source to the map
                mapRef.current.addSource(sourceId, {
                    type: 'geojson',
                    data: data,
                });

                if (sourceId == 'Kindertageseinrichtungen') {
                    mapRef.current.addLayer({
                        id: sourceId,
                        type: 'symbol',
                        source: sourceId,
                        layout: {
                            'icon-image': 'Kindertageseinrichtungen', // Specify the image name here
                            'icon-size': 0.07, // Adjust the size of the icon
                            'icon-allow-overlap': true, // Allow icons to overlap
                        },
                    });
                }
                if (sourceId == 'Schulen') {
                    mapRef.current.addLayer({
                        id: sourceId,
                        type: 'symbol',
                        source: sourceId,
                        layout: {
                            'icon-image': 'schulen', // Specify the image name here
                            'icon-size': 0.07, // Adjust the size of the icon
                            'icon-allow-overlap': true, // Allow icons to overlap
                        },
                    });
                }
                if (sourceId == 'Schulsozialarbeit') {
                    mapRef.current.addLayer({
                        id: sourceId,
                        type: 'symbol',
                        source: sourceId,
                        layout: {
                            'icon-image': 'schulsozialarbeit', // Specify the image name here
                            'icon-size': 0.07, // Adjust the size of the icon
                            'icon-allow-overlap': true, // Allow icons to overlap
                        },
                    });
                }


                // Add a layer to display the points


                // Add click event for popups
                mapRef.current.on('click', sourceId, (e) => {
                    const coordinates = e.features[0].geometry.coordinates.slice();
                    const properties = e.features[0].properties;
                    const id = e.features[0].id;
                    console.log(id);
                    let popupContent;
                    // if pro

                    popupContent = `
                    <h3 class='text-blue-600 text-left font-bold capitalize text-sm'>${sourceId}</h3>
                    <button class=" flex w-full justify-end items-center"> <i class="fa-regular fa-bookmark fa-xl  text-red-600 mt-4 mb-4 text-right" title='Add to Favourite.'></i></button>
                        <div class= 'popup-facility max-h-50 overflow-y-auto'>
                        ${Object.entries(properties, id).map(([key, value], index) => (
                        `<div class='flex px-4 '>
                        ${index < 5? `<div class='text-sm font-semibold text-black-600 '>${key}: <span class=' font-light'>${value}</span> </div>`  : ''}
                            
                            </div>`
                    )).join('')}


                        </div>

                        <br/>
                        <a href="/${sourceId.toLowerCase()}/${id}" class='text-white px-4 py-1 bg-green-500 font-bold text-sm'> More</a>`;

                    new mapboxgl.Popup()
                        .setLngLat(coordinates)
                        .setHTML(popupContent)
                        .addTo(mapRef.current);
                });

                // Change the cursor to a pointer when the mouse is over the points layer.
                mapRef.current.on('mouseenter', sourceId, () => {
                    mapRef.current.getCanvas().style.cursor = 'pointer';
                });

                // Change it back to a pointer when it leaves.
                mapRef.current.on('mouseleave', sourceId, () => {
                    mapRef.current.getCanvas().style.cursor = '';
                });
            }
        } catch (error) {
            console.error('Error fetching GeoJSON data:', error);
        }
    };

    const updateMapData = (api) => {
        if (api.url === 'show_all') {
            // Show all layers
            apiOptions.forEach(option => {
                if (mapRef.current.getLayer(option.label)) {
                    mapRef.current.setLayoutProperty(option.label, 'visibility', 'visible');
                }
            });
        } else {
            // Hide all layers except the selected one
            apiOptions.forEach(option => {
                if (mapRef.current.getLayer(option.label)) {
                    mapRef.current.setLayoutProperty(
                        option.label,
                        'visibility',
                        option.url === api.url ? 'visible' : 'none'
                    );
                }
            });
        }
    };

    useEffect(() => {
        if (!mapRef.current || !selectedApi) return; // Wait until the map is initialized and an API is selected
        updateMapData(selectedApi);
    }, [selectedApi]);

    return (
        <div className='m-4'>
            <div className=''> <Nav /> </div>
            {/* <div className=''> <Dropdown /> </div> */}
            <div className='sm:w-100 lg:w-2/3 h-4/5 my-12'>
                <h1 className='chemnitz-map text-3xl text-center font-bold flex justify-center '>
                    Chemnitz Map of "Bildung, Familie & Soziales"
                </h1>
                <select
                    onChange={(e) => setSelectedApi(apiOptions.find(api => api.url === e.target.value))}
                    defaultValue=""
                    style={{ marginBottom: '10px' }}
                    className='mt-12 mb-12 p-2 bg-gray-200 rounded-lg shadow-md text'
                >
                    {apiOptions.map((option) => (
                        <option className='hover:bg-red-500 hover:text-white hover:font-bold hover:rounded-md' key={option.url} value={option.url}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div ref={mapContainerRef} style={{ width: '100%', height: '65vh' }} />
            </div>
        </div>

    );
};

export default Map;
