import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Nav from '../components/Nav';

function UserProfile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
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
                console.log(response.data)
            } catch (error) {
                setError('Failed to fetch user data');
            }
        };

        fetchUser();
    }, [navigate]);

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
                        <p className='text-6xl text-blue-500 font-bold text-center pb-8'>Welcome, {user.username}</p>
                        {/* <p className='font-medium text-lg leading-1 text-pink-400 text-center'>Explore Education, Family & Social Affairs Facilities in Chemnitz with interective MAP </p> */}
                    </div>
                    <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full md:w-2/3 lg:w-1/3 items-center max-w-4xl transition duration-1000 ease-out py-20">
                        <h2 className='p-3 text-3xl font-bold text-pink-400 text-center'>User Profile</h2>
                        <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
                        {/* <h3 className='text-xl font-semibold text-blue-400 pt-2'>Sign In!</h3> */}

                        {/* Inputs */}
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <div className='flex flex-col items-center justify-center pt-12'>

                            <label className='font-bold' htmlFor="username">Username:</label>
                            <h1 className='pb-4'> {user.username}</h1>

                            <label className='font-bold' htmlFor="email">Email:</label>
                            <p className='pb-6'> {user.email}</p>

                            <label className='font-bold' htmlFor="home_address">Home Address:</label>
                            <p className='pb-12'>{user.home_address}</p>

                            <label className='font-bold' htmlFor="home_address">Favourite facility</label>
                            <p className='pb-12'>{user.favourite_facility}</p>
                            {/* Sign In */}
                        </div>

                        <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
                        {/* <p className='text-blue-400 mt-4 text-sm'>Don't have an account?</p> */}
                        <div className='flex py-12 '>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded-full' onClick={() => navigate('/user/update')}>Update Profile</button>
                            <button className='bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 mx-4 rounded-full' onClick={() => navigate('/user/delete-profile')}>Delete Profile</button>
                        </div>

                    </div>
                </main>
            </div>
            {/* <h1>Welcome, {user.username}</h1>
            <p>Email: {user.email}</p>
            <p>Home address: {user.home_address}</p>
            <p>Fav facility: {user.favourite_facility}</p> */}
        </div>
    );
}

export default UserProfile;