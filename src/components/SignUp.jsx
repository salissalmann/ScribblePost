import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./LoginSignUpNav";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [name, SetName] = useState();
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();

  const Navigate = useNavigate();

  const HandleNameValue = (event) => {
    SetName(event.target.value);
  };
  const HandleEmailValue = (event) => {
    SetEmail(event.target.value);
  };
  const HandlePasswordValue = (event) => {
    SetPassword(event.target.value);
  };

  const Submit = async (e) => {
    e.preventDefault();
    const Response = await fetch(
      `http://localhost:3001/authorization/createUser`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      }
    );
    const ResponseToJson = await Response.json();
    if (ResponseToJson.Success) {
      localStorage.setItem("Token", ResponseToJson.AuthToken);
      Navigate("/Login", { replace: true });
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="container my-5">
        <div className="row">
          <div className="col">
            <div className="main">
              <div className="signup-form my-3">
                <div className="container ">
                  <div className="header">
                    <h1>Create an Account</h1>
                    <p>Get started for free!</p>
                  </div>
                  <form onSubmit={Submit}>
                    <div className="input">
                      <i className="fa-solid fa-user"></i>
                      <input
                        type="name"
                        id="name"
                        name="name"
                        placeholder="Name"
                        aria-describedby="emailHelp"
                        onChange={HandleNameValue}
                      />
                    </div>
                    <div className="input">
                      <i className="fa-solid fa-envelope"></i>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        aria-describedby="emailHelp"
                        onChange={HandleEmailValue}
                      />
                    </div>
                    <div className="input">
                      <i className="fa-solid fa-lock"></i>
                      <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        onChange={HandlePasswordValue}
                      />
                    </div>
                    <input className="signup-btn" type="submit" value="Create Account" />
                  </form>
                  <p>
                    Already have an account? <Link to="/">Login</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <img
              src="/SignUp.png"
              className="LoginPic"
              height={500}
              width={660}
              alt="Picture"
            />
          </div>
        </div>
      </div>
    </>
  );
}
