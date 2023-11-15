import React, { useState } from "react";
import { Icon } from "@iconify/react";

const SeedGeneration = () => {
  // Static array of words, you would replace these with the actual words.
  const words = [
    "vouge",
    "weird",
    "Jane",
    "mighty",
    "sword",
    "eagle",
    "fight",
    "paper",
    "grow",
    "phone",
    "screw",
    "pencil",
  ];

  // State to track if the secret words are revealed
  const [revealed, setRevealed] = useState(false);

  const handleRevealClick = () => {
    setRevealed(true);
  };

  return (
    <div className="seed-generation">
      <h6 className="page-count">3/4</h6>
      <h2>Write down your Secret Recovery Phrase</h2>
      <p>
        Write down this 12-word Secret Recovery Phrase and save it in a place
        that you trust and only you can access.
      </p>
      <h5>Tips:</h5>
      <ul className="tips">
        <li>Save in a password manager</li>
        <li>Store in a safe deposit box</li>
        <li>Write down and store in multiple secret places</li>
      </ul>
      <div className={`words-container ${revealed ? "revealed" : ""}`}>
        {revealed ? (
          words.map((word, index) => (
            <div key={index} className="word">
              {index + 1}.<span className="word-target">{word}</span>
            </div>
          ))
        ) : (
          <div className="mask">
            <Icon icon="iconoir:eye-solid" className="text-[#828CAE]" /> <br />
            Make sure nobody is looking
          </div>
        )}
      </div>
      {revealed ? (
        <button className="secure-my-wallet-btn reveal"> Next</button>
      ) : (
        <button
          onClick={handleRevealClick}
          className="secure-my-wallet-btn reveal"
        >
          Reveal Secret Recovery Phrase
        </button>
      )}
    </div>
  );
};

export default SeedGeneration;
