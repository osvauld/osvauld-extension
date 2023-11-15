import { Storage } from "@plasmohq/storage";

import React, { useState } from "react";

const CreatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatch, setIsMatch] = useState(true);

  const handlePasswordChange = async (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsMatch(password === e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      console.log("Password successfully set");
      // Handle the submission logic here
      const storage = new Storage();
      await storage.set("password", password);
    }
  };

  return (
    <div className="password-content">
      <h2 className="main-heading">Create password</h2>
      <p className="main-pitch">
        This password will unlock your osvauld account only in this device.
        <br />
        osvauld cannot recover this password
      </p>
      <form onSubmit={handleSubmit} className="password-form">
        <div className="form-group">
          <label>New Password(8 characters min):</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={isMatch ? "input" : "input input-error"}
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
