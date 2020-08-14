import React from 'react';

import Tilt from 'react-tilt';
import './logo.css'
import brain from './brain.png';

const Logo = () => {
  return (
    <Tilt
      className="Tilt"
      options={{ max: 55 }}
      style={{ height: 250, width: 250 }}
    >
      <div className="Tilt-inner pa3"> <img style={{paddingTop:'5px'}} src={brain} alt='logo' /> </div>
    </Tilt>
  );
}

export default Logo;