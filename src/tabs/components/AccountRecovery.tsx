import React, { useState } from "react";

const AccountRecovery = () => {
  const [recoveryPhrase, setRecoveryPhrase] = useState(Array(12).fill(""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phraseLength, setPhraseLength] = useState("12");

  const handlePhraseChange = (index) => (e) => {
    const newRecoveryPhrase = [...recoveryPhrase];
    newRecoveryPhrase[index] = e.target.value;
    setRecoveryPhrase(newRecoveryPhrase);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Submit the data
    console.log(recoveryPhrase, password);
  };

  return (
    <div className="wallet-reset-form">
      <h2>Reset Wallet</h2>
      <form onSubmit={handleSubmit}>
        <div className="phrase-length-selector">
          <label htmlFor="phraseLength">Secret Recovery Phrase</label>
          <select
            id="phraseLength"
            value={phraseLength}
            onChange={(e) => setPhraseLength(e.target.value)}
            className="dropdown"
          >
            <option value="12">12-word phrase</option>
            <option value="24">24-word phrase</option>
          </select>
        </div>
        <div className="recovery-phrase-inputs">
          {Array.from({ length: parseInt(phraseLength) }, (_, i) => (
            <input
              key={i}
              type="text"
              value={recoveryPhrase[i]}
              onChange={handlePhraseChange(i)}
              className="recovery-input"
            />
          ))}
        </div>
        <div className="password-inputs">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="New password (8 characters min)"
            className="password-input"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm password"
            className="password-input"
          />
        </div>
        <button type="submit" className="restore-button">
          Restore
        </button>
      </form>
    </div>
  );
};

export default AccountRecovery;
