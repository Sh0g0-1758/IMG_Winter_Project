import "./enter.css";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactDOM } from "react";

export function Enter() {
  let [email,setemail] = useState("");
  let [password,setpassword] = useState("");
  let [auth,setauth] = useState({});

  function Emailf (e) {
    setemail(e.target.value);
  }

  function Passwordf (e) {
    setpassword(e.target.value);
  }

  function login () {
    let user_info = {
      email:email,
      password:password
    }
    if(Object.keys(auth).length !=  0) {
      console.log(auth);
      console.log("auth is empty");
      if(user_info.email === auth.email) {
        if(user_info.password === auth.password) {
          navigate("/join_create")
        } else {
          alert("please enter the correct password !!")
        }
      } else {
        alert("Please enter the correct email ID !!")
      }
    } else {
      axios
      .post("http://localhost:5000/login", user_info)
      .then((res) => {
        console.log("the request is sent !!");
        let please = res.data;
        if(please === null) {
          alert("Please enter a valid email !!");
        } else {
          setauth(please);
            if(user_info.password === please.password) {
              localStorage.setItem("user",please.name);
              navigate("/join_create")
            } else {
              alert("Please enter the correct password !!");
            }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  const navigate = useNavigate();

  function SignUp () {
    navigate("/signup");
  }
  // let [user_data,setuser_data] = useState({})
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  var client_id_channeli = "U6k2VPhgc4MPkA4CYzqx1WQ4bifXCZ3zn9Czxtmh";

  const redirector = () => {
    console.log(6);
    var url =
      "https://channeli.in/oauth/authorise/?client_id=" + client_id_channeli;
    window.location = url;

    console.log(window.location.search);
  };

  const handleFailure = (result) => {
    alert(result);
  };

  const handleLogin = (googleData) => {
    console.log(googleData.profileObj.email, googleData.profileObj.name);
    let user_data = {
      email: googleData.profileObj.email,
      name: googleData.profileObj.name,
    };
    let name_unqiue = user_data.name;
    localStorage.setItem("user", user_data.name);
    axios
      .post("http://localhost:5000/user_data", user_data)
      .then(() => console.log("the message is sent"))
      .catch((err) => {
        console.log(err);
      });
    navigate("/join_create");
  };

  const client_id =
    "35456688723-ttp0g14hbrn3ua7fvtlu56h3mhej1rma.apps.googleusercontent.com";

  return (
    <>
      <div className="outside-container">
        <div id="leftSide" className="main-container">
          <h1 id="leftSideHeading">SIGN IN</h1>

          <div className="div-for-labels">
            <label for="email-ask" className="form-label">
              Email address
            </label>
            <input onChange={Emailf} type="email" id="email-ask" className="textbox-for-loginpage" />
          </div>

          <div className="div-for-labels">
            <label for="pwd-ask" className="form-label">
              Password
            </label>
            <input onChange={Passwordf} type="password" className="textbox-for-loginpage" id="pwd-ask" />
          </div>
          {/* and check this  */}
          <div style={{ margin: "20px 0px" }}>
            <Link to={"http://localhost:3000/signup"}>Don't have an account?</Link>
          </div>

          <button onClick={login} type="submit" className="btn btn-primary" id="login-btn">
            LOGIN
          </button>

          <h6 id="HRwithOR">
            <span id="HRwithORSpan">OR</span>
          </h6>

          <div id="SMC">
            <button id="Channel-IBTN" onClick={redirector}>
              <img src= "https://channeli.in/branding/site/logo.svg" id="ChannelILogo" alt="Im" /> Login
              with Channel i
            </button>

            <GoogleLogin
              clientId={client_id}
              buttonText="Login with Google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={"single_host_origin"}
            ></GoogleLogin>
          </div>
        </div>

        <div id="rightSide">
          <div id="rightSideContents">
            <p>
              <h3>Don't have an account?</h3>
              Create your account for hosting quizes and comparing your score
              with your friends
            </p>
            {/* chek this  */}
            <button onClick={SignUp} className="btn btn-primary" id="RegisterBTN">
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// export function ChanneliOauth (){
//   var client_id_channeli= 'U6k2VPhgc4MPkA4CYzqx1WQ4bifXCZ3zn9Czxtmh';

//   function redirector(){
//       var url='https://channeli.in/oauth/authorise/?client_id='+client_id_channeli
//       window.location=url
//   }

//   //const= window.location.

//   return(
//     <>
//     <button onclick={redirector}>Sign in with Channneli</button>
//     </>
//   )
// }