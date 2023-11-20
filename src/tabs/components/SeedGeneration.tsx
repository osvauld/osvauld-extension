import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { hdkey } from "ethereumjs-wallet";

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

      // Derive an HD Wallet from the seed
      const hdWallet = hdkey.fromMasterSeed(seed);

      // Derive the first account using the standard Ethereum HD path
      const path = "m/44'/60'/0'/0/0"; // This is the standard derivation path for Ethereum
      const wallet = hdWallet.derivePath(path).getWallet();

      const privateKey = wallet.getPrivateKey().toString("hex");
      const publicKey = wallet.getPublicKey().toString("hex");
      const address = wallet.getAddress().toString("hex");

      console.log(`Private Key: 0x${privateKey}`);
      console.log(`Public Key: 0x${publicKey}`);
      console.log(`Address: 0x${address}`);
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
