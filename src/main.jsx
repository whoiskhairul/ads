import React from 'react'
import ReactDOM from 'react-dom/client'

import UserPage from './pages/UserPage.jsx' 
import App from './App.jsx'
import Nav from './components/Nav.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Map from './components/Map.jsx'
import LogoutPage from './pages/LogoutPage.jsx'
import UpdateUser from './pages/UpdateUser.jsx'

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
    element: <LoginPage />,
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
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
