import React from "react";

const SuccessMessage = () => {
  const handleGotIt = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <div className="wallet-creation-success">
      <h1>{String.fromCodePoint("0x1f389")}</h1>
      <h1>Account creation successful</h1>
      <p>
        You've successfully protected your wallet. Keep your Secret Recovery
        Phrase safe and secret -- it's your responsibility!
      </p>
      <ul className="success-message">
        <li>osvauld can't recover your Secret Recovery Phrase.</li>
        <li>osvauld will never ask you for your Secret Recovery Phrase.</li>
        <li>
          Never share your Secret Recovery Phrase with anyone or risk your funds
          being stolen.
        </li>
        {/* <li>
          <a href="https://example.com/learn-more">Learn more</a>
        </li> */}
      </ul>
      {/* <button onClick={handleAdvancedConfiguration}>
        Advanced configuration
      </button> */}
      <button onClick={handleGotIt} className="secure-my-wallet-btn reveal">
        Got it!
      </button>
    </div>
  );
};

export default SuccessMessage;
