import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { pki, random } from "node-forge";

const SeedGeneration = () => {
  const [words, setWords] = useState([]);

  const [keys, setKeys] = useState({ privateKey: "", publicKey: "" });

  const [revealed, setRevealed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const generateKeys = async () => {
      const mnemonic = generateMnemonic(128);
      setWords(mnemonic.split(" ")); // Store mnemonic words in state
      console.log(mnemonic);
      // Convert the mnemonic to a seed
      const seed = (await mnemonicToSeed(mnemonic)).toString("hex");

      console.log(seed);

      // // Use the seed to create a new PRNG for `node-forge`
      const prng = random.createInstance();
      prng.seedFileSync = () => seed;

      // // Generate an RSA key pair using the seeded PRNG
      // const { privateKey, publicKey } = pki.rsa.generateKeyPair({
      //   bits: 4096,
      //   prng,
      //   workers: 2,
      // });
      // console.log(privateKey, publicKey);
    };
    generateKeys();
  }, []);

  const handleRevealClick = () => {
    setRevealed(true);
  };

  const handleNextClick = () => {
    // Securely pass the words to the next component
    navigate("/seed-confirmation", { state: { words } });
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
        <button
          className="secure-my-wallet-btn reveal"
          onClick={handleNextClick}
        >
          {" "}
          Next
        </button>
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
