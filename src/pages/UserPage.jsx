import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';


import Nav from '../components/Nav'
function UserProfile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        Navigate
        const fetchUser = async () => {
            const token = sessionStorage.getItem('token'); // Retrieve token from session storage
            if (!token) {
                // setError('No token found');
                navigate('/login'); // Redirect to login page if no token found
                return;
            }

            try {
                const response = await axios.get('http://127.0.0.1:8000/auth/user/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                setError('Failed to fetch user data');
            }
        };

        fetchUser();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Nav />
            <h1>Welcome, {user.username}</h1>
            <p>Email: {user.email}</p>
            <p>First Name: {user.address}</p>
            <p>Last Name: {user.name}</p>
        </div>
    );
}

export default UserProfile;
