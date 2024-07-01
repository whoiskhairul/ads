import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Nav from '../components/Nav';

function DeleteProfile() {
    const navigate = useNavigate();

    const deleteProfile = async () => {
        try {
            console.log('trying to delete profile')
            const response = await axios.delete('http://localhost:8000/auth/delete/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}` // replace with the actual token
                }
            });
            localStorage.removeItem('token');
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.error('Error deleting profile', error);
        }
    };

    return (
        <>
        <Nav />
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <button 
                onClick={deleteProfile} 
                className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
            >
                Delete Profile
            </button>
        </div>
        </>
    );
}

export default DeleteProfile;