import React from 'react'
import globeIcon from '../assets/icons/globe.svg'

const Navbar = () => {
  return (
      <nav className="nav container" aria-label="Main">
        <div className = 'nav__content'>
          <div className="nav__globe">
              <img className="nav__globe-icon nav__globe-icon--color" src={globeIcon} alt="airbnb-logo" />
           </div>
            <h1 className="nav__heading">tr!ppy</h1>
        </div>
      </nav>
  )
}

export default Navbar