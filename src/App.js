import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Logout from "./components/common/logout";
import NavBar from "./components/navbar";
import NotFound from "./components/notFound";
import SampleForm from "./components/sampleForm";
import verifyForm from "./components/verifyForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import SubmitForm from "./components/submitForm";
import PPVForm from "./components/ppvForm";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/sample/submit" component={SubmitForm} />
            <ProtectedRoute path="/sample/verify" component={verifyForm} />
            <ProtectedRoute path="/sample/ppv" component={PPVForm} />
            {/* 
            <Route
              // this is how to pass props to route, use render, and the {...props} is because there are some
              // props being passed by Route component, add our custom props after it
              path="/movies"
              render={props => <Movies {...props} user={this.state.user} />}
            />
            <Route path="/customers" component={Customers} /> */}
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/sample/submit" />
            <Redirect to="not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
