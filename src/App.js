//See if you can do something with the 
// Remove Node modules from github.

import React, { Component } from 'react';
import './App.css';

//Third-party Librays/APIs
import Particles from "react-particles-js";

import Navigation from './components/navigation/navigation';
// import Logo from './components/logo/logo.jsx';
import ImageLinkForm from './components/image-link-form/image-link-form';
import Rank from './components/rank/rank';
import FaceRecogniton from "./components/face-recognition/face-recognition";
import SignIn from './components/sign-in/sign-in';
import Register from "./components/register/register";

const particleOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 250
      }
    },
  },
};

const initialState = {
  input: "",
  imageURL: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined:data.joined,
    }})
  }

  onRouteChange = (route = 'signin') => {
    if(route === 'signout' || route === 'register') {
      this.setState({initialState});
    }else if (route === 'home'){
      this.setState({isSignedIn:true})
    }

    this.setState({route : route});
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol : width - (clarifaiFace.right_col * width),
      topRow: clarifaiFace.top_row * height,
      bottomRow : height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState( {box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = () => {
    this.setState({ imageURL: this.state.input });
    fetch("http://localhost:3000/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  }

  render() {
    const route = this.state.route;
    let view;

    if(route === 'home'){
      view = (
        <div>
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit}
          />
          <FaceRecogniton imgURL={this.state.imageURL} box={this.state.box} />
        </div>
      );
    } else if (route === 'signin' || route === 'signout'){
      view = (
        <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
      );
    } else if(route === 'register'){
      view = (
        <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
      );
    }

    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation
          onRouteChange={this.onRouteChange}
          route={this.state.route}
          isSignedIn={this.state.isSignedIn}
        />
       {view}
      </div>
    );
  }
  
}

export default App;
