/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./LoginSignUpNav";
import { Link } from "react-router-dom";

export default function Login() {
  const handlecallback = (response)=>
  {
      console.log('Encoded JWT token: ' , response.credential);
  }

  useEffect( ()=>{
    /*global google*/
    google.accounts.id.initialize({
      client_id: '234972539659-og7nggr6cdj541fn3vk06b4cufj95lal.apps.googleusercontent.com',
      callback: handlecallback
    })

    google.accounts.id.renderButton(
      document.getElementById('button-container'),{
      size: 'large',
      theme: 'outline'}
    )

  },[])
  
  
  
  
  
  
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();

  const Navigate = useNavigate();

  const HandleEmailValue = (event) => {
    SetEmail(event.target.value);
  };
  const HandlePasswordValue = (event) => {
    SetPassword(event.target.value);
  };

  const Submit = async (e) => {
    console.log(email)
    e.preventDefault();
    //Body mein jo bhejre ho wo yad se apne same rakhne hai jo API recieve kare ko jaise ke body.email in Backand or frontend per email body mein bheje.
    const Response = await fetch(`http://localhost:3001/authorization/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const ResponseToJson = await Response.json();
    if (ResponseToJson.Success) {
      localStorage.setItem("Token", ResponseToJson.AuthToken);
      Navigate("/Home", { replace: true });
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="container my-5">
        <div className="row">
           <div className="col"><img src="/Login.png" className="LoginPic" height={500} width={660} alt="Picture" /></div>
          <div className="col">
            <div className="main">
              <div className="signup-form my-3">
                <div className="container ">
                  <div className="header">
                    <h1>Login to your Account</h1>
                    <p>Get started for free!</p>
                  </div>
                  <form onSubmit={Submit}>
                    <div className="input">
                      <i className="fa-solid fa-user"></i>
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
                    <input className="signup-btn" type="submit" value="Login" />
                  </form>
                  <p>
                    Don't have an account?  <Link to="/SignUp" >SignUp</Link> 
                
                  </p>
                
                  <div id="button-container">Button</div>   
                 
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
