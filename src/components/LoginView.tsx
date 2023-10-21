import React, { useState } from "react";
import { Storage } from "@plasmohq/storage";

const LoginView = ({ loginAction }) => {
  const storage = new Storage();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [error, setError] = useState(false);

  async function saveToken(token) {
    await storage.set("token", token);
  }

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("https://api.shadowsafe.xyz/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const { token } = data.data;
        await saveToken(token);
        await storage.set("loginStatus", true);
        loginAction(true);
      } else {
        console.error("Authentication failed");
        setError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(true);
    }
  };

  return (
    <div className="cred-container">
      <div className="cred-section">
        <h3>Username</h3>
        <div className="username">
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <h3>Password</h3>
        <div className="password">
          <input type={inputType} value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="visible-eye cursor-pointer" onClick={togglePasswordVisibility}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                stroke="rgba(130, 140, 174, 0.4)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                stroke="rgba(130, 140, 174, 0.4)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        {error && (
          <div className="error-message">
            <p>Authentication Failed!</p>
          </div>
        )}
      </div>
      <div className="button-section login-button">
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginView;
