import React, { useState, useEffect, useRef } from "react";
import {
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Alert,
} from "reactstrap";
import classnames from "classnames";
import { connect, useDispatch, useSelector } from "react-redux";
import { login } from "redux/actions/authAction";
import BounceLoader from "react-spinners/ClipLoader";
import Notify from "react-notification-alert";

const SignInForm = ({ error }) => {
  const dispatch = useDispatch();
  const authstate = useSelector((state) => state.AuthReducer);

  const [state, setState] = useState({
    usernamefocus: false,
    passwordfocus: false,
    username: "",
    password: "",
    isLoading: false,
    notify: false,
  });

  useEffect(() => {}, []);

  const notify = useRef();

  var options = {
    place: "tl",
    message: "hello",
    type: "danger",
    autoDismiss: 3,
  };

  const handleChangevalue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { username: state.username, password: state.password };
    try {
      setState((prevState) => {
        return { ...prevState, isLoading: true };
      });
      await dispatch(login(data));
      if (error) {
        setState((prevState) => {
          return { ...prevState, isLoading: false, notify: true };
        });
      }
    } catch (e) {
      setState((prevState) => {
        return { ...prevState, isLoading: false, notify: false };
      });
    }
  };

  const onDismiss = () => {
    setState((prevState) => {
      return { ...prevState, notify: false };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        className={classnames({
          "input-group-focus": state.usernamefocus,
        })}
      >
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="tim-icons icon-single-02"></i>
          </InputGroupText>
        </InputGroupAddon>

        <Input
          type="email"
          id="username"
          name="username"
          placeholder="Email"
          onFocus={(e) =>
            setState((prevState) => {
              return { ...prevState, usernamefocus: true };
            })
          }
          onBlur={(e) =>
            setState((prevState) => {
              return { ...prevState, usernamefocus: false };
            })
          }
          onChange={handleChangevalue}
        />
      </InputGroup>
      <InputGroup
        className={classnames({
          "input-group-focus": state.passwordfocus,
        })}
      >
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="tim-icons icon-lock-circle"></i>
          </InputGroupText>
        </InputGroupAddon>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Mot de passe"
          onFocus={(e) =>
            setState((prevState) => {
              return { ...prevState, passwordfocus: true };
            })
          }
          onBlur={(e) =>
            setState((prevState) => {
              return { ...prevState, passwordfocus: false };
            })
          }
          onChange={handleChangevalue}
        />
      </InputGroup>
      <div className="text-center mt-3">
        <Button
          type="submit"
          className="mx-auto btn-primary d-flex justify-content-center"
        >
          {state.isLoading ? (
            <>
              <span className="mr-2">Connexion en cours </span>
              <BounceLoader
                className
                color="#fff"
                loading={state.isLoading}
                size={18}
              />
            </>
          ) : (
            <span>Se connecter</span>
          )}
        </Button>
        <div className="mt-3 p-3" style={{ minHeight: "100px" }}>
          <Alert color="danger" isOpen={state.notify} toggle={onDismiss}>
            <span>Erreur connexion</span>
          </Alert>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return { error: state.errorMessageReducer };
};

export default connect(mapStateToProps, null)(SignInForm);
