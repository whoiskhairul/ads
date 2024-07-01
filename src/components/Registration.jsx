import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import 'tailwindcss/tailwind.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
    home_address: ''
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/auth/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    console.log(response.status, response.ok)
     // Store the response data

    if (response.ok) {
      console.log('User registered:');
      alert('User registered successfully');
      navigate('/login');

    } else {
      console.log('Lets see')
      setErrors(await response.json());
      console.error('Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
        <div className="mb-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password1"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.password1 && <span className="text-red-500 text-sm">{errors.password1}</span>}
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.password2 && <span className="text-red-500 text-sm">{errors.password2}</span>}
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="home_address"
            placeholder="Address"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.home_address && <span className="text-red-500 text-sm">{errors.home_address}</span>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">Register</button>
        {errors.non_field_errors && <div className="text-red-500 text-sm mt-4">{errors.non_field_errors}</div>}
      </form>
    </div>
  );
}

export default Register;