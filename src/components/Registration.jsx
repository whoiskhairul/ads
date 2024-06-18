import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
    home_address: ''
  });

  const [errors, setErrors] = useState({});

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
    console.log(formData)

    if (response.ok) {
      const data = await response.json();
      console.log('User registered:', data);
    } else {
      const errorData = await response.json();
      setErrors(errorData);
      console.error('Registration failed', errorData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        {errors.username && <span style={{color: 'red'}}>{errors.username}</span>}
      </div>
      <div>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
      </div>
      <div>
        <input type="password" name="password1" placeholder="Password" onChange={handleChange} required />
        {errors.password1 && <span style={{color: 'red'}}>{errors.password1}</span>}
      </div>
      <div>
        <input type="password" name="password2" placeholder="Confirm Password" onChange={handleChange} required />
        {errors.password2 && <span style={{color: 'red'}}>{errors.password2}</span>}
      </div>
      <div>
        <input type="text" name="home_address" placeholder="Address" onChange={handleChange} required />
        {errors.home_address && <span style={{color: 'red'}}>{errors.home_address}</span>}
      </div>
      <button type="submit">Register</button>
      {errors.non_field_errors && <div style={{color: 'red'}}>{errors.non_field_errors}</div>}
    </form>
  );
}

export default Register;
