import React, {Component} from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
// import ParticlesBg from 'particles-bg';


const returnClarifaiJSONRequest = (imageUrl) => {
   const PAT = '697d591472b14a4c9fafda9e3facf5ae';
    const USER_ID = '9qnqroy1xb35';       
    const APP_ID = 'test';
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    return requestOptions;

}

class App extends Component {
  constructor() {
    super()
    this.state= {
      input:"",
      imageUrl:"",
      box: {},
      route: "signin",
      isSignedIn:false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col*width,
      topRow: clarifaiFace.top_row*height,
      rightCol: width - (clarifaiFace.right_col*width),
      bottomRow: height - (clarifaiFace.bottom_row*height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input})
    fetch(`https://api.clarifai.com/v2/models/face-detection/outputs`, returnClarifaiJSONRequest(this.state.input))
        .then(response => response.json())
        .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
        .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if(route === "signout") {
      this.setState({isSignedIn:false})
    }else if (route === "home"){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }

  render(){
    const {isSignedIn, route, box, imageUrl} = this.state;
      return (
    <div>
    {/* <ParticlesBg type="cobweb" bg={true} /> */}
    <Navigation isSignedIn={isSignedIn} onRouteChange ={this.onRouteChange}/>
    {route === "home" ?
        <div>
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition box={box} imageUrl={imageUrl} /> 
        </div>:( route === "signup" ?
          <Register onRouteChange={this.onRouteChange} /> :
          <SignIn onRouteChange={this.onRouteChange} /> 
        )
    }
    </div>
  );
  }
}

export default App;
