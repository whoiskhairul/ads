import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, GitHub, Google } from '@mui/icons-material';
import Nav from '../components/Nav';
import '../assets/Login.css';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      navigate('/'); // Redirect to home page if token exists
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful authentication (e.g., store the token, redirect user, etc.)
        console.log('Login successful:', data);
        setIsAuthenticated(true);

        const token = data.key;
        // console.log(token);
        // Store the token in localStorage
        localStorage.setItem('token', token);
        setError('');

        // Redirect user to home page
        navigate('/');
      } else {
        const errorData = await response.json();
        setError(errorData.non_field_errors || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    handleLogin();
  };

  if (isAuthenticated) {
    navigate('/');
  }

  return (
    <>
      <Nav LoggedIn={isAuthenticated} />    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen md:py-2">
        <main className="flex items-center w-full px-2 md:px-20">
          <div className="hidden md:inline-flex flex-col flex-1 space-y-1">
            <p className='text-6xl text-blue-500 font-bold text-center'>EduMap Chemnitz</p>
            <p className='font-medium text-lg leading-1 text-pink-400 text-center'>Explore Education, Family & Social Affairs Facilities in Chemnitz with interactive MAP</p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full md:w-2/3 lg:w-1/3 items-center max-w-4xl transition duration-1000 ease-out">
            <h2 className='p-3 text-3xl font-bold text-pink-400 text-center'>EduMap Chemnitz</h2>
            <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
            <h3 className='text-xl font-semibold text-blue-400 pt-2'>Sign In!</h3>
            <div className='flex space-x-2 m-4 items-center justify-center'>
              <div className="socialIcon">
                <Facebook />
              </div>
              <div className="socialIcon">
                <GitHub />
              </div>
              <div className="socialIcon">
                <Google />
              </div>
            </div>
            {/* Inputs */}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form action="" onSubmit={handleSubmit}>
              <div className='flex flex-col items-center justify-center'>
                <label htmlFor="username">Username:</label>
                <input type='text' id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' ></input>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' ></input>
                <button type='submit' className='rounded-2xl m-2 text-white bg-blue-400 w-2/5 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'>
                  Sign In
                </button>
              </div>
            </form>

            <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
            <p className='text-blue-400 mt-4 text-sm'>Don't have an account?</p>
            <p className='text-blue-400 mb-4 text-sm font-medium cursor-pointer' onClick={() => setIsLogin(false)}>
              <Link to='/register/'>
                Create a New Account?
              </Link>
            </p>
          </div>
        </main>
      </div>
    </>

  );
}

export default Login;