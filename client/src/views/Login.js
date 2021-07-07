import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
} from "reactstrap";
import SignInForm from "./SignInForm";
import img from "../assets/img/card_primary.png";

const Login = () => {
  const [state, setState] = useState({
    isloading: false,
    hTabs: "ht1",
  });

  return (
    <>
      <div
        className="content d-flex justify-content-center "
        style={{ height: "100vh" }}
      >
        <Card
          style={{ maxWidth: "20rem", minHeight: "23rem", alignSelf: "center" }}
        >
          <CardHeader style={{ paddingBottom: "120px" }}>
            <Nav
              className=" nav-pills-primary justify-content-md-center"
              pills
              style={{ cursor: "pointer" }}
            >
              <NavItem>
                <NavLink
                  className={state.hTabs === "ht1" ? "active" : ""}
                  onClick={() => setState({ hTabs: "ht1" })}
                >
                  Se Connecter
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={state.hTabs === "ht2" ? "active" : ""}
                  onClick={() => setState({ hTabs: "ht2" })}
                >
                  Creer un compte
                </NavLink>
              </NavItem>
            </Nav>
          </CardHeader>
          <CardBody>
            <TabContent activeTab={state.hTabs} className="tab-space">
              <TabPane tabId="ht1">
                <SignInForm />
              </TabPane>
            </TabContent>
            <TabContent activeTab={state.hTabs} className="tab-space">
              <TabPane tabId="ht2">
                <h2>Creation de compte</h2>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Login;
