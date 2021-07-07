import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import Login from "./views/Login";
import { setToken } from "redux/actions/authAction";
import { getCookiesAuth } from "components/Utils/AuthServices";
import { get_entreprises } from "redux/actions/entreprisesAction";
import { get_rdv } from "redux/actions/rdvAction";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticate: false, isLoading: true };
  }

  async componentDidMount() {
    let cacheAuth = await getCookiesAuth();

    if (cacheAuth) {
      this.setState((prevState) => {
        return {
          ...prevState,
          isAuthenticate: true,
          isLoading: false,
        };
      });

      try {
        await this.props.setToken(cacheAuth);
      } catch (error) {}
    }
  }

  render() {
    return (
      <ThemeContextWrapper>
        <BackgroundColorWrapper>
          <BrowserRouter>
            <Switch>
              {!this.props.authState.token ? (
                <Route path="/login" component={Login} />
              ) : (
                <Route
                  path="/"
                  render={(props) => <AdminLayout {...props} />}
                />
              )}

              <Route path="/rtl" render={(props) => <RTLLayout {...props} />} />
              <Redirect from="/" to="/login" />
            </Switch>
          </BrowserRouter>
        </BackgroundColorWrapper>
      </ThemeContextWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return { authState: state.AuthReducer };
};

const mapDispatchToProps = {
  setToken,
  get_entreprises,
  get_rdv,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
