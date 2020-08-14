import React from 'react'

import './face-recognition.css';

const FaceRecognition = ({ imgURL, box}) => {
  return (
    <div className="center ma ">
      <div className="absolute mt2">
        <img id='inputImage' src={imgURL} alt="recognition-img" width="500px" height="auto" />
        <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
      </div>
    </div>
  );
}

export default FaceRecognition;