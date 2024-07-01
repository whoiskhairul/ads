import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

const LogoutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                const response = await fetch('http://localhost:8000/auth/logout/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
                    },
                });

                if (response.ok) {
                    // Remove the token from localStorage
                    localStorage.removeItem('token');
                    // Redirect to the login page or home page
                    navigate('/');
                } else {
                    // Handle errors
                    console.error('Logout failed');
                }
            } catch (error) {
                console.error('An error occurred during logout:', error);
            }
        };

        logout();
    }, [navigate]);

    return (
        <div>
            <Nav />
            <h1>Logging out...</h1>
        </div>
    );
};

export default LogoutPage;