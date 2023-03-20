import "./signup.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export function Signup() {
  let [Name, setname] = useState("");
  let [Email, setEmail] = useState("");
  let [Password, setPassword] = useState("");
  const navigate = useNavigate();
  function login() {
    navigate("/");
  }

  function namef(e) {
    setname(e.target.value);
  }

  function emailf(e) {
    setEmail(e.target.value);
  }

  function passwordf(e) {
    setPassword(e.target.value);
  }

  function Create() {
    if (Name === "") {
      alert("please enter a valid name");
    } else if (Email === "") {
      alert("Please enter a valid email !!");
    } else {
      let user_info = {
        name: Name,
        email: Email,
        password: Password,
      };
      axios
        .post("http://localhost:5000/signUp", user_info)
        .then(() => console.log("the message is sent"))
        .catch((err) => {
          console.log(err);
        });
      localStorage.setItem("user", user_info.name);
      navigate("/");
    }
  }
  return (
    <div className="outside-container">
      {/* Left side */}
      <div id="rightSide">
        <div id="rightSideContents">
          <p></p>
          <h3>Already have an account?</h3>
          Login to participate in fun quizes and even host them
          <p />
          {/* check me */}
          <button onClick={login} className="btn btn-primary" id="RegisterBTN">
            Login
          </button>
        </div>
      </div>
      {/* Right Side */}
      <div id="leftSide" className="main-container">
        <h1 id="leftSideHeading">SIGN UP</h1>
        <div className="div-for-labels">
          <label htmlFor="name-ask" className="form-label">
            Name
          </label>
          <input
            onChange={namef}
            type="text"
            id="name-ask"
            className="textbox-for-loginpage"
          />
        </div>
        <div className="div-for-labels">
          <label htmlFor="email-ask" className="form-label">
            Email address
          </label>
          <input
            onChange={emailf}
            type="email"
            id="email-ask"
            className="textbox-for-loginpage"
          />
        </div>
        <div className="div-for-labels">
          <label htmlFor="pwd-ask" className="form-label">
            Password
          </label>
          <input
            onChange={passwordf}
            type="password"
            className="textbox-for-loginpage"
            id="pwd-ask"
          />
        </div>
        <button
          onClick={Create}
          type="submit"
          className="btn btn-primary"
          id="login-btn"
        >
          CREATE ACCOUNT
        </button>
      </div>
    </div>
  );
}
