import React, { useState } from 'react';

const Signup = () => {
  const [username, setUsername]=useState("");
  const [email, setEmail]=useState("");
  const [first_name, setFirst_name]=useState("");
  const [password1, setPassword1]=useState("");
  const [password2, setPassword2]=useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log( username, email , password1, password2)
    try {
      const response = await fetch('http://localhost:8000/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email , password1, password2}),
      });
      console.log(response);
      if (response.statusCode === 204) {
        // const data = await response.json();
        // Handle successful authentication (e.g., store the token, redirect user, etc.)
        // console.log('reg successful:', data);

      // Redirect user to home page
      alert('user created successfully');
      } else {
        const errorData = await response.json();
        console.log("on the error block")
        alert(errorData.username);

      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    console.log(error)
    }
  };

  return (
    <div className="signup-form">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            // value={formData.username}
            onChange={(e)=>{setUsername(e.target.value)}}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            // value={formData.email}
            onChange={(e)=>{setEmail(e.target.value)}}

            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            // value={formData.address}
            onChange={(e)=>{setFirst_name(e.target.value)}}

            required
          />
        </div>
        <div>
          <label htmlFor="password1">Password:</label>
          <input
            type="password"
            id="password1"
            name="password1"
            // value={formData.password1}
            onChange={(e)=>{setPassword1(e.target.value)}}
            required
          />
        </div>
        <div>
          <label htmlFor="password2">Confirm Password:</label>
          <input
            type="password"
            id="password2"
            name="password2"
            // value={formData.password2}
            onChange={(e)=>{setPassword2(e.target.value)}}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
