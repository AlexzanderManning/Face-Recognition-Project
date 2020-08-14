//See if you can do something with the 
// Remove Node modules from github.

import React, { Component } from 'react';
import './App.css';

//Third-party Librays/APIs
import Particles from "react-particles-js";
import Clarifai from "clarifai";

import Navigation from './components/navigation/navigation';
// import Logo from './components/logo/logo.jsx';
import ImageLinkForm from './components/image-link-form/image-link-form';
import Rank from './components/rank/rank';
import FaceRecogniton from "./components/face-recognition/face-recognition";
import SignIn from './components/sign-in/sign-in';
import Register from "./components/register/register";

const app = new Clarifai.App({
  apiKey: "cb72222430eb463ab30a1b81ed7e0038",
});

const particleOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 250
      }
    },
    // line_linked: {
    //   shadow: {
    //     enable: true,
    //     color: "#3CA9D1",
    //     blur: 5,
    //   },
    // },
  },
};


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imgURL: "",
      box: {},
      route: 'signin',
      isSignedIn : false
    }
  }

  onRouteChange = (route = 'signin') => {
    if(route === 'signout' || route === 'register') {
      this.setState({isSignedIn: false})
    }else if (route === 'home'){
      this.setState({isSignedIn:true})
    }

    this.setState({route : route})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol : width - (clarifaiFace.right_col * width),
      topRow: clarifaiFace.top_row * height,
      bottomRow : height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState( {box: box})
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input: event.target.value})
  }

  onSubmit = () => {
    this.setState({imgURL: this.state.input});
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation
          onRouteChange={this.onRouteChange}
          route={this.state.route}
          isSignedIn={this.state.isSignedIn}
        />
        {this.state.route === "home" ? (
          <div>
            {/* <Logo /> */}
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecogniton imgURL={this.state.imgURL} box={this.state.box} />
          </div>
        ) : (this.state.route === "signin" 
          ?<SignIn onRouteChange={this.onRouteChange} />
          :<Register onRouteChange={this.onRouteChange} />)
        }
      </div>
    );
  }
  
}

export default App;
