import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

const MAPBOX_TOKEN = import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN;

function UserProfile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [favFacilities, setFavFacilities] = useState('');
    const [favFacilitiesSuggestions, setFavFacilitiesSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const navigate = useNavigate();
    const addressInputRef = useRef(null);

    useEffect(() => {
        document.title = "Update User Profile"
        const fetchUser = async () => {
            const token = localStorage.getItem('token'); // Retrieve token from session storage
            if (!token) {
                navigate('/login'); // Redirect to login page if no token found
                return;
            }
            

            try {
                const response = await axios.get('http://127.0.0.1:8000/auth/user/', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${token}`,
                    },
                });
                setUser(response.data);
                // console.log(response.data);
            } catch (error) {
                setError('Failed to fetch user data');
            }
        };

        fetchUser();
    }, [navigate]);

    const fetchSuggestions = async (query) => {
        if (!query) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`, {
                params: {
                    access_token: MAPBOX_TOKEN,
                    autocomplete: true,
                    types: 'address',
                    country: 'DE'
                },
            });
            setSuggestions(response.data.features);
            setActiveSuggestionIndex(0);
        } catch (error) {
            console.error('Error fetching address suggestions:', error);
        }
    };

    const fetchFavFacilitiesSuggestions = (query) => {
        fetch('http://127.0.0.1:8000/testing/facilities/')
            .then((response) => response.json())
            .then((data) => {
                const suggestions = [];
                Object.values(data).forEach((array) => {
                    array.forEach((facility) => {
                        if (facility.toLowerCase().includes(query.toLowerCase())) {
                            suggestions.push(facility);
                        }
                    });
                });
                setFavFacilitiesSuggestions(suggestions);
            });
    };

    const handleFavFacilitiesChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value)

        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
        setFavFacilities(value);
        fetchFavFacilitiesSuggestions(value);
    };

    const handleFavFacilitiesSuggestionClick = (suggestion) => {
        const value = suggestion
        console.log(name, value)

        setUser((prevUser) => ({
            ...prevUser,
            ['favourite_facility']: value,
        }));
        setFavFacilities(value);
        fetchFavFacilitiesSuggestions(value);
    };

    const handleAddressChange = (e) => {
        const query = e.target.value;
        setUser((prevUser) => ({
            ...prevUser,
            home_address: query,
        }));
        fetchSuggestions(query);
    };

    const handleSuggestionClick = (suggestion) => {
        setUser((prevUser) => ({
            ...prevUser,
            home_address: suggestion.place_name,
        }));
        setSuggestions([]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setActiveSuggestionIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
        } else if (e.key === 'ArrowUp') {
            setActiveSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (e.key === 'Enter') {
            if (suggestions.length > 0) {
                handleSuggestionClick(suggestions[activeSuggestionIndex]);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            await axios.put('http://127.0.0.1:8000/auth/update/', user, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
            });
            console.log(user)
            alert('Profile updated successfully!');
            navigate('/user');
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile');
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Nav />

            <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen md:py-2">
                <main className="flex items-center w-full px-2 md:px-20">
                    <div className="hidden md:inline-flex flex-col flex-1/2 space-y-1">
                        <p className='text-6xl text-blue-500 font-bold text-center'>Welcome, {user.username}</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-2xl flex flex-col px-12 w-full md:w-2/3 lg:w-1/3 items-start max-w-4xl transition duration-1000 ease-out py-20 justify-start">                        
                        <h2 className='p-3 text-3xl font-bold text-pink-400 text-center'>Update User Profile</h2>
                        <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>

                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <div className='flex flex-col pt-4'>
                            <label className='font-bold' htmlFor="email">Email:</label>
                            <p className='pb-6'> {user.email}</p>
                            <form onSubmit={handleSubmit}>
                                <p className='font-bold text-left' htmlFor="username">Username:</p>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    onChange={handleInputChange}
                                    placeholder={user.username}
                                    className='border border-blue-400 rounded-md p-2 w-100'
                                />

                                <p className='font-bold text-left' htmlFor="home_address">Home Address:</p>
                                <input
                                    type="text"
                                    id="home_address"
                                    name="home_address"
                                    value={user.home_address}
                                    onChange={handleAddressChange}
                                    onKeyDown={handleKeyDown}
                                    ref={addressInputRef}
                                    className='border border-blue-400 rounded-md p-2 w-100'
                                />
                                {suggestions.length > 0 && (
                                    <ul className="border border-blue-400 rounded-md p-2 w-3/4 bg-white">
                                        {suggestions.map((suggestion, index) => (
                                            <li
                                                key={suggestion.id}
                                                onClick={() => handleSuggestionClick(suggestion)}
                                                className={`cursor-pointer hover:bg-gray-200 p-2 ${index === activeSuggestionIndex ? 'bg-gray-200' : ''}`}
                                            >
                                                {suggestion.place_name}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <p className='font-bold text-left' htmlFor="favourite_facility">Favourite Facility:</p>
                                <input
                                    type="text"
                                    id="favourite_facility"
                                    name="favourite_facility"
                                    placeholder={user.favourite_facility}
                                    value={favFacilities}
                                    onChange={handleFavFacilitiesChange}
                                    className='border border-blue-400 rounded-md p-2 w-100'
                                />
                                {favFacilitiesSuggestions.length > 0 && (
                                    <ul className="border border-blue-400 rounded-md p-2 w-3/4 bg-white">
                                        {favFacilitiesSuggestions.slice(0, 5).map((suggestion, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleFavFacilitiesSuggestionClick(suggestion)}
                                                className={`cursor-pointer hover:bg-gray-200 p-2 ${index === activeSuggestionIndex ? 'bg-gray-200' : ''}`}
                                            >
                                                {suggestion}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <div className="flex justify-right mt-4">
                                    <input type="submit" value="Update" className='bg-blue-400 text-white p-2 rounded-md w-20'></input>
                                </div>
                            </form>
                        </div>
                        <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default UserProfile
