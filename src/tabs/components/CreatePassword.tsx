import { Storage } from "@plasmohq/storage";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePassword = () => {
  const navigate = useNavigate();
  const [isLongEnough, setIsLongEnough] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatch, setIsMatch] = useState(true);

  const handlePasswordChange = async (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsLongEnough(newPassword.length >= 6);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setIsMatch(password === newConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setIsLongEnough(false);
      return;
    }
    if (password === confirmPassword) {
      console.log("Password successfully set");
      const storage = new Storage();
      await storage.set("password", password);
      //Put the above in secure context Please
      navigate("/seedphrase-instructions");
    }
  };

  return (
    <div className="password-content">
      <h6 className="page-count">1/4</h6>
      <h2 className="main-heading">Create password</h2>
      <p className="main-pitch">
        This password will unlock your osvauld account only in this device.
        <br />
        osvauld cannot recover this password
      </p>
      <form onSubmit={handleSubmit} className="password-form">
        <div className="form-group">
          <label>New Password(minimum 6 characters):</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={isMatch ? "input input-ok" : "input"}
          />
          {!isLongEnough && (
            <p className="headsup-text">
              Password must be at least 6 characters long.
            </p>
          )}
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={isMatch ? "input input-ok" : "input input-error"}
          />
          {!isMatch && <p className="error-text">Passwords do not match!</p>}
        </div>
        <button
          type="submit"
          disabled={!isMatch || !password}
          className="submit-btn"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePassword;
