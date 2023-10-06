
import React, { useState, useEffect, useInsertionEffect } from "react";
import { SecureStorage } from "@plasmohq/storage/secure"
import { Storage } from "@plasmohq/storage"


const LoginView = ({loginAction}) => {

  const storage = new Storage()
  let usernameList 
 

  
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [inputType, setInputType] = useState('password');
   const [token, setToken] = useState("")



      // async function saveToken(){

      //   console.log(token,'token changed saving to secu storage');
      //   await storage.set("token", token);
          
      // }

      

   const togglePasswordVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
    //usage:

  };
 
   const handleLogin = async () => {
    console.log('Button Clicked');
    loginAction(true);
    //  try {
    //   console.log('1')
    //    const response = await fetch("https://api.shadowsafe.xyz/authenticate", {
    //      method: "POST",
    //      headers: {
    //        "Content-Type": "application/json",
    //      },
    //      body: JSON.stringify({
    //        userName: username,
    //        password: password,
    //      }),
    //    });
    //    if (response.ok) {
    //      const data = await response.json();
    //      const { token } = data.data;
    //     //  console.log('Authentication compelete saving cookie');
    //     //  console.log('token value', token);
    //      setToken(token);
    //      //await saveToken()

    //     // console.log(chrome.cookies)
    //     //  chrome.cookies.set(
    //     //   {
    //     //     url: "http://shadowsafe.xyz", 
    //     //     name: "authToken",
    //     //     value: token,
    //     //   },
    //     //   (cookie) => {
    //     //     if (chrome.runtime.lastError) {
    //     //       console.error(chrome.runtime.lastError);
    //     //     } else {
    //     //       console.log("Cookie set successfully:", cookie);
    //     //     }
    //     //   }
    //     // );

    //    } else {
    //      // Handle authentication error here (e.g., show an error message)
    //      console.error("Authentication failed");
    //    }
    //  } catch (error) {
    //    console.error("Error:", error);
    //  }
   };
 

    return (
      <div className="cred-container">
      <div className="cred-section">
        <h3>Username</h3>
        <div className="username">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <h3>Password</h3>
        <div className="password">
          <input
            type={inputType}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="visible-eye cursor-pointer" onClick={togglePasswordVisibility}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#828CAE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#828CAE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="button-section login-button">
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
    )
  }
  
  export default LoginView
  