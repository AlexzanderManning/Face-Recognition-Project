import React, { Component } from 'react'

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = async () => {
    //Making a post request via fetch
    //Then doing doing something with it
    //Making a request in the body.
    try {
      const response = await fetch("https://afternoon-plateau-57665.herokuapp.com/signin", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: this.state.signInEmail,
          password: this.state.signInPassword,
        }),
      });

      const user = await response.json();

      if (user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange("home");
      } else {
        await Promise.reject(
          new Error("Error during sign in. Check credentials and try again.")
        );
      }
    } catch (err) {
      alert(err);
    }
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <div>
        <p className="white f4">You may sign in with this test account:</p>
        <p className="white f3">
          email:johnappleseed@gmail.com password:iloveapples
        </p>
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    className="b pa2 input-reset ba bg-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="b pa2 input-reset ba bg-white w-100"
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                  />
                </div>
              </fieldset>
              <div className="">
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent  pointer f6 dib pointer"
                  type="submit"
                  value="Sign in"
                  onClick={this.onSubmitSignIn}
                />
              </div>
              <div className="lh-copy mt3">
                <p
                  href="#0"
                  className="f6 link dim black db"
                  onClick={() => onRouteChange("register")}
                >
                  Register
                </p>
              </div>
            </div>
          </main>
        </article>
      </div>
    );
  }
}

export default SignIn;