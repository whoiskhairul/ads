import React from 'react'
import ReactDOM from 'react-dom/client'

import UserPage from './pages/UserPage.jsx' 
import App from './App.jsx'
import Nav from './components/Nav.jsx'
import Login from './components/Login.jsx'
import Map from './components/Map.jsx'
import Impressum from './components/Impressum.jsx'
import LogoutPage from './pages/LogoutPage.jsx'
import UpdateUser from './pages/UpdateUser.jsx'
import DeleteProfile from './pages/DeleteProfile.jsx'
import UpdateDatabase from './pages/UpdateDatabase.jsx'

import MapWithDirections from './components/Direction.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from'react-router-dom'
import RegistrationPage from './pages/RegistrationPage.jsx'
import DetailsPage from './pages/DetailsPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Map />,
    errorElement: <h1>404, not found</h1>,
  },
  {
    path: '/login/',
    element: <Login />,
    errorElement: <h1>404, not found, login</h1>,
  },
  {
    path: '/register/',
    element: <RegistrationPage />,
    errorElement: <h1>404, not found, register</h1>,
  },
  {
    path: '/logout/',
    element: <LogoutPage />,
    errorElement: <h1>404, not found, register</h1>,
  },
  {
    path: '/user/',
    element: <UserPage />,
    errorElement: <h1>404, not found, user</h1>,
  },
  {
    path: '/user/update',
    element: <UpdateUser />,
    errorElement: <h1>404, not found, user</h1>,
  },
  {
    path: '/user/delete-profile',
    element: <DeleteProfile />,
    errorElement: <h1>404, not found, user</h1>,
  },
  {
    path: '/user/update',
    element: <UpdateUser />,
    errorElement: <h1>404, not found, user</h1>,
  },
  {
    path: '/impressum/',
    element: <Impressum />,
    errorElement: <h1>404, not found, user</h1>,
  },
  {
    path: '/direction/',
    element: <MapWithDirections />,
    errorElement: <h1>404, not found, user</h1>,
  },
  {
    path: '/schulen/:id',
    element: <DetailsPage />,
  },
  {
    path: '/kindertageseinrichtungen/:id',
    element: <DetailsPage />,
  },
  {
    path: '/schulsozialarbeit/:id',
    element: <DetailsPage />,
  },
  {
    path: '/jugendberufshilfen/:id',
    element: <DetailsPage />,
  },
  {
    path: '/update-database',
    element: <UpdateDatabase />,
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
