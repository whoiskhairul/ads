import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav'
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    useEffect(() => {
        const Logout = async () => {
            const token = sessionStorage.getItem('token'); // Retrieve token from session storage
            if (!token) {
                // setError('No token found');
                history.push('/login'); // Redirect to login page if no token found
                return;
            }

            try {
                alert('Logging out');
                const response = await axios.get('http://127.0.0.1:8000/auth/logout/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                sessionStorage.removeItem('token', token);

            } catch (error) {
                alert('Failed to logout');
            }
        };

        Logout();
    }, []);

    return (
        <div>
            <Nav />
            <h1>Successfully logged out.</h1>
        </div>
    )
}

export default LogoutPage
