import React from 'react';
import Nav from './Nav';
function useStyles() {
  return {
    paper: 'p-4 m-4',
    title: 'mb-4 text-2xl font-bold',
    subtitle: 'mb-2 text-xl font-bold',
  };
}

function Impressum() {
  const classes = useStyles();
  return (
    <>
    <Nav />
    <div className="container">
      <h2 className={classes.title}>Impressum</h2>
      <div className={classes.paper}>
        <h4 className={classes.subtitle}>Company Information</h4>
        <p>Company Name: Khairul Islam</p>
        <p>Address: Chemnitz</p>
        <p>Phone: +4905753600466</p>
        <p>Email: whoiskhairul@gmail.com</p>
      </div>
      <div className={classes.paper}>
        <h4 className={classes.subtitle}>Legal Disclosure</h4>
        <p>Information in accordance with Section 5 TMG</p>
        {/* Add more legal information here */}
        <p>Website: www.example.com</p>
        <p>Registered Office: Chemnitz, Germany</p>
        <p>Trade Register: A123456</p>
      </div>
      <div className={classes.paper}>
        <h4 className={classes.subtitle}>Privacy Policy</h4>
        <p>This web application is developed for a university project, everything here are for testing purpose.</p>
        {/* Add privacy policy content here */}
      </div>
      {/* Add more sections as needed */}
    </div>
    </>
    
  );
}


export default Impressum;