import React, {Component} from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import ParticlesBg from 'particles-bg';

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
    fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs", returnClarifaiJSONRequest(this.state.input))
        .then(response => response.json())
        .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
        .catch(error => console.log('error', error));
  }

  render(){
      return (
    <div>
    <ParticlesBg type="cobweb" bg={true} />
    <Navigation />
    <Logo />
    <Rank />
    <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
    {this.state.imageUrl && <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>}
    </div>
  );
  }
}

export default App;
