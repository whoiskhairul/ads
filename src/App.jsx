import { useState } from 'react'

import './App.css'
import Nav from './components/Nav.jsx'
import Dropdown from './components/Dropdown.jsx'
import Map from './components/Map.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='m-4'>
      <Nav />
      <Dropdown />
      <Map />

    </div>
  )
}

export default App
