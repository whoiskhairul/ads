import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../components/Nav.jsx'

import '../App.css';

import schulenImg from '../assets/schulen.png'
import kindertageseinrichtungenImg from '../assets/kindertageseinrichtungen.png'
import schulsozialarbeitImg from '../assets/schulsozialarbeit.png'
import jugendberufshilfenImg from '../assets/jugendberufshilfen.png'

mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN;

const apiOptions = [
    { label: 'Show all', url: 'show_all', color: null }, // New option to show all data
    { label: 'Schulen', url: 'http://127.0.0.1:8000/api/schulen/', color: '#3c8f13' }, // Green
    { label: 'Schulsozialarbeit', url: 'http://127.0.0.1:8000/api/schulsozialarbeit/', color: '#00eaff' }, // Blue
    { label: 'Kindertageseinrichtungen', url: 'http://127.0.0.1:8000/api/kindertageseinrichtungen/', color: '#c90808' }, // Red
    { label: 'Jugendberufshilfen', url: 'http://127.0.0.1:8000/api/jugendberufshilfen/', color: '#000000' }, // Black
];
const token = localStorage.getItem('token');
// console.log(token)


const Map = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null); // Reference to the map object
    const [selectedApis, setSelectedApis] = useState(['show_all']); // Initially select "Show all"

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Education, Family & Social Map'
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
            mapRef.current.loadImage('/src/assets/jugendberufshilfen.png', (error, image) => {
                if (error) throw error;
                mapRef.current.addImage('jugendberufshilfen', image);
            });

            // Initial fetch and add all layers on map load
            apiOptions.forEach(api => {
                if (api.url !== 'show_all') {
                    fetchGeoJsonData(api.url, api.color, api.label);
                }
            });
        });
    }, []);

    const fetchGeoJsonData = async (url, color, sourceId) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            // console.log(data);

            if (mapRef.current.getSource(sourceId)) {
                mapRef.current.getSource(sourceId).setData(data);
                mapRef.current.setPaintProperty(sourceId, 'circle-color', color);
            } else {
                mapRef.current.addSource(sourceId, {
                    type: 'geojson',
                    data: data,
                });

                if (sourceId === 'Kindertageseinrichtungen') {
                    mapRef.current.addLayer({
                        id: sourceId,
                        type: 'symbol',
                        source: sourceId,
                        layout: {
                            'icon-image': 'Kindertageseinrichtungen',
                            'icon-size': 0.07,
                            'icon-allow-overlap': true,
                        },
                    });
                }
                if (sourceId === 'Schulen') {
                    mapRef.current.addLayer({
                        id: sourceId,
                        type: 'symbol',
                        source: sourceId,
                        layout: {
                            'icon-image': 'schulen',
                            'icon-size': 0.07,
                            'icon-allow-overlap': true,
                        },
                    });
                }
                if (sourceId === 'Schulsozialarbeit') {
                    mapRef.current.addLayer({
                        id: sourceId,
                        type: 'symbol',
                        source: sourceId,
                        layout: {
                            'icon-image': 'schulsozialarbeit',
                            'icon-size': 0.07,
                            'icon-allow-overlap': true,
                        },
                    });
                }
                if (sourceId === 'Jugendberufshilfen') {
                    mapRef.current.addLayer({
                        id: sourceId,
                        type: 'symbol',
                        source: sourceId,
                        layout: {
                            'icon-image': 'jugendberufshilfen',
                            'icon-size': 0.07,
                            'icon-allow-overlap': true,
                        },
                    });
                }

                mapRef.current.on('click', sourceId, (e) => {
                    const coordinates = e.features[0].geometry.coordinates.slice();
                    const properties = e.features[0].properties;
                    const id = e.features[0].id;
                    console.log(id);
                    
                    let popupContent = `<h3 class='text-blue-600 text-left font-bold capitalize text-sm'>${sourceId}</h3>`;
                    if (properties['art'] === 'Berufsbildende Schule') {
                        popupContent += `<h3 class='text-white bg-green-600 w-fit px-4 py-1 rounded-md text-left font-bold capitalize text-xs'>${properties['art']}</h3>`;
                    } else if (properties['art'] === 'Grundschule') {
                        popupContent += `<h3 class='text-white bg-yellow-500 w-fit text-left font-bold capitalize text-xs'>${properties['art']}</h3>`;
                    } else if (properties['art'] === 'Oberschule') {
                        popupContent += `<h3 class='text-white bg-blue-500 w-fit text-left font-bold capitalize text-xs'>${properties['art']}</h3>`;
                    } else if (properties['art'] === 'Förderschule') {
                        popupContent += `<h3 class='text-white bg-red-500 w-fit text-left font-bold capitalize text-xs'>${properties['art']}</h3>`;
                    } else if (properties['art'] === 'Gymnasium') {
                        popupContent += `<h3 class='text-white bg-violet-500 w-fit text-left font-bold capitalize text-xs'>${properties['art']}</h3>`;
                    }
                    popupContent += `
                        <div class='popup-facility max-h-50 overflow-y-auto pt-4'>
                        ${Object.entries(properties, id).map(([key, value], index) => (
                            `<div class='flex px-4 '>
                            ${index < 5 ? `<div class='text-sm font-semibold text-black-600 '>${key}: <span class=' font-light'>${value}</span></div>` : ''}
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

                mapRef.current.on('mouseenter', sourceId, () => {
                    mapRef.current.getCanvas().style.cursor = 'pointer';
                });

                mapRef.current.on('mouseleave', sourceId, () => {
                    mapRef.current.getCanvas().style.cursor = '';
                });
            }
        } catch (error) {
            console.error('Error fetching GeoJSON data:', error);
        }
    };

    const SubmitFavourite = async (sourceId, id) => {
        // console.log('hi')
        // const sourceId = sourceId; // replace with your sourceId
        // const id = id; // replace with your id
        // console.log(sourceId, id);
        let url = 'http://localhost:8000/testing/add-to-favourite/?sourceId=' + sourceId + '&id='+ id
        // console.log(url);
        // console.log(token);
        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });
            // console.log(response.data);
        } catch (error) {
            console.error('Error adding to favourite', );
        }
    };

    const updateMapData = () => {
        if (selectedApis.includes('show_all')) {
            // Show all layers
            apiOptions.forEach(option => {
                if (mapRef.current.getLayer(option.label)) {
                    mapRef.current.setLayoutProperty(option.label, 'visibility', 'visible');
                }
            });
        } else {
            // Show selected layers and hide others
            apiOptions.forEach(option => {
                if (mapRef.current.getLayer(option.label)) {
                    mapRef.current.setLayoutProperty(
                        option.label,
                        'visibility',
                        selectedApis.includes(option.url) ? 'visible' : 'none'
                    );
                }
            });
        }
    };

    useEffect(() => {
        if (!mapRef.current || !selectedApis) return; // Wait until the map is initialized and APIs are selected
        updateMapData();
    }, [selectedApis]);

    const handleCheckboxChange = (url) => {
        let newSelectedApis;
    
        if (url === 'show_all') {
          newSelectedApis = ['show_all'];
        } else {
          newSelectedApis = selectedApis.includes(url)
            ? selectedApis.filter((apiUrl) => apiUrl !== url)
            : [...selectedApis, url];
    
          if (newSelectedApis.includes('show_all') && newSelectedApis.length > 1) {
            newSelectedApis = newSelectedApis.filter((apiUrl) => apiUrl !== 'show_all');
          }
        }
    
        setSelectedApis(newSelectedApis);
      };

    return (
        <div className=''>
            <div className=''> <Nav /> </div>
            <div className='flex flex-col lg:flex-row '>
                <div className='sm:w-100 lg:w-2/3 h-4/5 my-12'>
                <h1 className='chemnitz-map text-3xl text-center font-bold flex justify-center '>
                    Chemnitz Map of "Bildung, Familie & Soziales"
                </h1>
                <div className='mt-12 mb-12 p-2 bg-gray-200 rounded-lg shadow-md'>
                    {apiOptions.map((option) => (
                        <label key={option.url} className='block'>
                            <input
                                type="checkbox"
                                value={option.url}
                                checked={selectedApis.includes(option.url)}
                                onChange={() => handleCheckboxChange(option.url)}
                                className='mr-2'
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
                <div ref={mapContainerRef} style={{ width: '100%', height: '65vh' }} />
            </div>
            <div className='w-100 lg:w-1.3 px-20 py-4 md:py-36 text-left font-bold text-2xl text-blue-900'>
                Legend
                <table className='pt-8 mt-8 border border-collapse border-y-indigo-950'>
                    <tr className='text-black font-mono text-left text-sm'>
                        <td className='p-4'>Schulen</td>
                        <td className='p-4'><img className='w-10 h-10' src={schulenImg} alt="" /> </td>
                    </tr>
                    <tr className='text-black font-mono text-left text-sm'>
                        <td className='p-4'>Kindergandenrichtungen</td>
                        <td className='p-4'> <img className='w-10 h-10' src={kindertageseinrichtungenImg} alt="" /> </td>
                    </tr>
                    <tr className='text-black font-mono text-left text-sm'>
                        <td className='p-4'>Schulsocialarbeit</td>
                        <td className='p-4'> <img className='w-10 h-10' src={schulsozialarbeitImg} alt="" /> </td>
                    </tr>
                    <tr className='text-black font-mono text-left text-sm'>
                        <td className='p-4'>Jugendberufshilfen</td>
                        <td className='p-4'> <img className='w-10 h-10' src={jugendberufshilfenImg} alt="" /> </td>
                    </tr>
                </table>
            </div>
            </div>
            
        </div>
    );
};

export default Map;
