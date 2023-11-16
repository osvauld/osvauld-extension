import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SeedConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const words = location.state?.words;
  const [inputValues, setInputValues] = useState({});
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    // Randomly select 3 unique indices from the words array
    let indices = new Set();
    while (indices.size < 3) {
      const randomIndex = Math.floor(Math.random() * (words?.length || 0));
      indices.add(randomIndex);
    }
    setSelectedIndices(Array.from(indices));
  }, [words]);

  useEffect(() => {
    // Check if all required words match
    const allMatch = selectedIndices.every(
      (index) => inputValues[index] === words[index]
    );
    setIsMatch(allMatch);
  }, [inputValues, selectedIndices, words]);

  const handleInputChange = (index) => (e) => {
    setInputValues({ ...inputValues, [index]: e.target.value });
  };

  const handleReset = () => {
    navigate("/seed-generation");
  };

  const handleConfirm = () => {
    navigate("/success-message");
  };

  if (!words) {
    return <p>No words found.</p>;
  }

  return (
    <div className="seed-generation">
      <h6 className="page-count">4/4</h6>
      <h2>Confirm Secret Recovery Phrase</h2>
      <p>Confirm your received seedphrase</p>

      <div className="words-container revealed">
        {words.map((word, index) => (
          <div key={index} className="word">
            {selectedIndices.includes(index) ? (
              <>
                {index + 1}.
                <input
                  type="text"
                  value={inputValues[index] || ""}
                  onChange={handleInputChange(index)}
                  className={`word-input ${isMatch ? "matched" : ""}`}
                />
              </>
            ) : (
              <>
                {index + 1}.<span className="word-target">{word}</span>
              </>
            )}
          </div>
        ))}
      </div>
      {isMatch ? (
        <button className="secure-my-wallet-btn reveal" onClick={handleConfirm}>
          Confirm
        </button>
      ) : (
        <button
          onClick={handleReset}
          className="secure-my-wallet-btn reveal reset"
        >
          Reset Seedphrase
        </button>
      )}
    </div>
  );
}
