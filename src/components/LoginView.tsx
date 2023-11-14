import React, { useState } from "react";
import { Storage } from "@plasmohq/storage";
import { SecureStorage } from "@plasmohq/storage/secure";

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

  const decryptPrivate = async () => {
    console.log("Decrypting Private key", password);
    const secuStorage = new SecureStorage();
    await secuStorage.setPassword(password);
    // Below step needs to be done at the beginning
    //  await secuStorage.set("private", "gibberish123uyidfgudsfkasdgyfkuasdgfs");
    const privateKey = await secuStorage.get("private");
    if (privateKey) {
      await storage.set("loginStatus", true);
      loginAction(true);
    } else {
      console.error("Wrong PIN");
      setError(true);
    }
  };

  let osvauld = (
    <svg
      width="36"
      height="36"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M35.8089 7.22425C36.5742 6.36527 37.648 6.89923 37.8462 8.03245C37.8953 8.31302 37.9478 8.61635 38.0029 8.93897C35.5393 11.6875 34.4255 13.7838 32.5443 17.3246L32.4081 17.5808C35.3885 13.5321 37.0634 11.4262 38.3446 10.9936C38.8115 13.8821 39.3345 17.4823 39.5561 20.314C39.7048 22.2145 39.8732 24.5654 40.026 26.7692C40.1408 28.4229 39.6927 29.4215 38.8366 29.8514C38.4001 31.2579 37.7837 32.6047 36.9951 33.8528C34.7666 37.3801 31.3304 39.8545 27.386 40.7723C26.6913 40.9339 25.99 41.0452 25.2868 41.1068C24.8363 40.0444 24.3329 38.7427 23.744 37.1813L23.803 37.4498C24.1117 38.8558 24.3726 40.0445 24.6611 41.1485C21.5766 41.2897 18.4809 40.4826 15.7629 38.7932C12.2406 36.604 9.61712 33.0979 8.42635 28.9884C16.2095 30.2306 20.5493 30.2955 28.2561 29.4795C32.4005 29.0406 34.7245 27.8083 36.3651 26.1366C37.3555 22.8046 37.7162 19.3069 36.6281 19.1462C36.4341 19.1176 36.1418 19.1531 35.7829 19.2293C33.965 20.2631 32.4594 21.0551 31.0626 21.6953C32.1468 21.873 32.9837 22.4019 33.2908 23.2233C33.8681 24.7675 32.3541 26.7602 29.9092 27.6743C27.4642 28.5884 25.0142 28.0776 24.4369 26.5334C24.1079 25.6533 24.4583 24.6273 25.2732 23.7385C25.2203 23.7524 25.1671 23.7662 25.1138 23.78C22.2587 24.1528 19.94 24.3954 17.7229 24.5202C18.9435 25.8737 19.3706 27.478 18.6551 28.5277C17.7266 29.8899 15.2254 29.8023 13.0686 28.3322C11.5176 27.2749 10.5671 25.7906 10.5008 24.5336C9.69979 24.4977 8.86165 24.4508 7.97189 24.3935C7.78727 20.3485 9.1509 16.3853 11.7853 13.3102C14.4196 10.2352 18.1267 8.27959 22.1521 7.84134C26.1019 7.41131 30.0669 8.474 33.27 10.8156C34.1279 9.40355 35.0086 8.12258 35.8089 7.22425ZM26.9915 26.1915C27.634 25.9486 27.958 25.2308 27.715 24.5883C27.4721 23.9458 26.7543 23.6219 26.1118 23.8648C25.4693 24.1077 25.1454 24.8255 25.3883 25.468C25.6313 26.1105 26.349 26.4345 26.9915 26.1915ZM13.3114 27.1115C13.9375 27.394 14.6741 27.1155 14.9566 26.4894C15.2392 25.8633 14.9607 25.1267 14.3346 24.8442C13.7085 24.5616 12.9719 24.8402 12.6893 25.4662C12.4068 26.0923 12.6853 26.8289 13.3114 27.1115Z"
        fill="#E4E6ED"
      />
    </svg>
  );

  return (
    <div className="cred-container">
      <div className="mock-logo">{osvauld}</div>
      <div className="cred-section">
        {/* <h3>Username</h3>
        <div className="username">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div> */}
        <h3>PIN</h3>
        <div className="password">
          <input
            type={inputType}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="visible-eye cursor-pointer"
            onClick={togglePasswordVisibility}
          >
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
            <p>Wrong PIN!</p>
          </div>
        )}
      </div>
      <div className="button-section login-button">
        <button onClick={decryptPrivate}>Access</button>
      </div>
    </div>
  );
};

export default LoginView;
