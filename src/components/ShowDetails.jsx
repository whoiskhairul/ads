import { React, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN;

const Map = ({ coordinates }) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null); // Reference to the map object

    useEffect(() => {
        document.title = 'Facility Details'
        // Initialize the map only once
        if (mapRef.current) return; // If mapRef.current is already set, do nothing
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: coordinates, // Use the provided coordinates as the center
            zoom: 12,
        });

        // Add a marker to the map
        new mapboxgl.Marker()
            .setLngLat(coordinates)
            .addTo(mapRef.current);
    }, [coordinates]);

    return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};

const ShowDetails = () => {
    const location = useLocation();
    const path = location.pathname;
    const facility_name = path.split('/')[1];
    const id = path.split('/')[2];
    const url = 'http://' + 'localhost:8000/api' + path;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');
    // console.log(token)
    useEffect(() => {

        fetch(url)
            .then(async response => {
                if (!response.ok) {
                    throw new Error('404 not found');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [url]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    let details = data.properties;
    let coordinates = data.geometry.coordinates; // Ensure this is the correct path to the coordinates


    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const SubmitFavourite = async (sourceId, id) => {
        let url = 'http://localhost:8000/testing/add-to-favourite/?sourceId=' + sourceId + '&id=' + id
        // console.log(url);
        // console.log(token);
        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });
            alert(response.data.message);
        } catch (error) {
            alert('add to favourite failed. You must be logged in to add a facility to favourite');
        }
    };

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='w-full md:w-1/2 py-12 px-2'>
                <p className='text-left text-2xl font-bold text-red-600 py-8 w-100'>{facility_name.toUpperCase()}</p>
                <button className='flex w-fit justify-end items-center'
                    onClick={() => SubmitFavourite(capitalize(facility_name), id)}
                >
                    <span className='bg-blue-400 text-white px-4 mx-2 rounded-lg hover:bg-green-800 '> Add To favourite </span>
                    <i className='fa-regular fa-bookmark fa-xl text-red-600 mt-4 mb-4 text-right hover:text-green-950 hover:bg-green-900'
                        title='Add to Favourite.'>
                    </i>
                </button>
                <table className="table-auto border border-slate-400 min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="border border-slate-300 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                                Key
                            </th>
                            <th scope="col" className="border border-slate-300 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody className="table-auto border border-slate-400 bg-white divide-y">
                        {Object.entries(details).map(([key, value]) => (
                            <tr key={key} className='w-1/6'>
                                <td className="border border-slate-300 text-center hover:bg-gray-100 px-6 py-2 uppercase w-1/4">{key}</td>
                                <td className="border border-slate-300 text-center hover:bg-gray-100 px-6 py-2 w-1/4">{value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='w-full lg:w-1/2 py-36 px-4'>
                <Map coordinates={coordinates} />
            </div>
        </div>
    );
};

export default ShowDetails;