import React from 'react';

import './image-link-form.css';

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div>
      <p className="white f3">
        {"This Magic Brain will detect faces in your pictures. Give it a try!"}
      </p>
      <div className="center">
        <div className='form center pa4 br3 shadow-5'>
          <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
          <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onSubmit}>
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}

//onChange is a react synthetic event. like onClick

export default ImageLinkForm;