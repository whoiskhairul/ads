import React, { useEffect, useRef } from 'react';

import Nav from '../components/Nav.jsx';

const UpdateDatabase = () => {
    useEffect(() => {
        
        // Fetch data
        const fetchDirections = async () => {
            try {
                const response = await fetch('http://localhost:8000/testing/update-data/');
                const data = await response.json();

                console.log(data);
                alert(data.message);    
                

            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchDirections();

    }, []);

  return (
    <div>
      <Nav />
    </div>
  )
}

export default UpdateDatabase
