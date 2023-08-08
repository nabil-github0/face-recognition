import React, {Component} from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import ParticlesBg from 'particles-bg';

const initialState = {
  input:"",
  imageUrl:"",
  boxes: [],
  route: "signin",
  isSignedIn:false,
  clarifaiApiError:"",
  user: {
        id:"",
        name:"",
        email:"",
        entries:0,
        joined:""
  }
}

class App extends Component {
  constructor() {
    super()
    this.state= initialState;
  }

  loadUser = (data)=> {
    this.setState({user: {
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions.map(region => region.region_info.bounding_box);
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

     return clarifaiFaces.map(face =>{
      return {
        leftCol: face.left_col*width,
        topRow: face.top_row*height,
        rightCol: width - (face.right_col*width),
        bottomRow: height - (face.bottom_row*height)
      }
    })
  }

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input});
    this.setState({clarifaiApiError:""});
    fetch("https://jittery-shrug-moth.cyclic.app/imageURL", {
      method:"post",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        imageURL:this.state.input
      })
    })
        .then(response => response.json())
        .then(result => {
          if(result.status.description === "Ok") {
            fetch(https://jittery-shrug-moth.cyclic.app/image", {
                 method: "put",
                 headers: { "Content-Type": "application/json" },
                 body: JSON.stringify({
                 id: this.state.user.id
      }),
    }).then(res => res.json())
    .then(data => {
      this.setState(Object.assign(this.state.user, {entries:data}));
    })
    this.displayFaceBox(this.calculateFaceLocation(result))          
          }else {
            this.setState({clarifaiApiError:"Your provided url should be less than 2000 characters"});
            this.displayFaceBox({});
          }
        })
        .catch(error => {this.setState({clarifaiApiError:"Your provided url should be less than 2000 characters"});
        this.displayFaceBox({});
      });
      document.getElementById("inputField").value = "";
  }

  onRouteChange = (route) => {
    if(route === "signout") {
      this.setState(initialState)
    }else if (route === "home"){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }

  render(){
    const {isSignedIn, route, boxes, imageUrl} = this.state;
      return (
    <div>
    <ParticlesBg color="#FFFFFF" num={30} type="cobweb" bg={true} />
    <Navigation isSignedIn={isSignedIn} onRouteChange ={this.onRouteChange}/>
    {route === "home" ?
        <div>
        <Logo />
        <Rank name={this.state.user.name} entries={this.state.user.entries} />
        <ImageLinkForm clarifaiApiError={this.state.clarifaiApiError} onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition boxes={boxes} imageUrl={imageUrl} /> 
        </div>:( route === "signup" ?
          <SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> :
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
        )
    }
    </div>
  );
  }
}

export default App;
