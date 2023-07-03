import React, { Component } from "react";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      erroResponse: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({
      signInEmail: event.target.value,
      erroResponse: "",
    });
  };

  onPasswordChange = (event) => {
    this.setState({
      signInPassword: event.target.value,
      erroResponse: "",
    });
  };

  onChangePasswordVisiblity = () => {
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    togglePassword.classList.toggle('fa-eye-slash');
  }


  onSubmitSignIn = () => {
    fetch("https://face-recognition-back-end-production.up.railway.app/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          this.props.onRouteChange("home");
          this.props.loadUser(data);
        } else {
          this.setState({ erroResponse: data });
        }
      });
  };

  onKeyDownSignIn = (event) => {
  if(event.key === "Enter") {
    fetch("https://face-recognition-back-end-production.up.railway.app/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          this.props.onRouteChange("home");
          this.props.loadUser(data);
        } else {
          this.setState({ erroResponse: data });
        }
      });
   } 
  }

  render() {
    const { onRouteChange } = this.props;
    const { erroResponse } = this.state;

    return (
      <article className="br3 mv4 w-90 w-75-m w-25-l mw6 shadow-1 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  onKeyDown={this.onKeyDownSignIn}
                  className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3 relative">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onPasswordChange}
                  onKeyDown={this.onKeyDownSignIn}
                  className="b pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100 pr4"
                  type="password"
                  name="password"
                  id="password"
                />
                <i
                  onClick={this.onChangePasswordVisiblity}
                  className="far fa-eye"
                  id="togglePassword"
                  style={{
                    position: "absolute",
                    top: "67%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer"
                  }}
                ></i>
              </div>
            </fieldset>
            <p className="f6 red db">{erroResponse}</p>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                style={{ cursor: "pointer" }}
                onClick={() => onRouteChange("signup")}
                className="f6 link dim black db"
              >
                Sign Up
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;
