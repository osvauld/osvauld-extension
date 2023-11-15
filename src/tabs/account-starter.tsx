import React, { useState } from "react";
import Welcome from "./components/Welcome";
import CreatePassword from "./components/CreatePassword";
import AccountRecovery from "./components/AccountRecovery";
import SeedphraseInstructions from "./components/SeedphraseInstructions";
import SeedGeneration from "./components/SeedGeneration";

import "./style.css";

export default function AccountStarter() {
  const [passwordPage, setpasswordPage] = useState(false);
  const [existingAccount, setexistingAccount] = useState(false);
  const [passwordSet, setPasswordSet] = useState(false);
  const [seedConfirmation, setSeedConfirmation] = useState(true);

  const handleNewAccount = () => {
    setpasswordPage((passwordPage) => !passwordPage);
  };

  const handleExistingAccount = () => {
    setexistingAccount((existingAccount) => !existingAccount);
  };

  const handlePasswordSubmit = () => {
    setPasswordSet((passwordSet) => !passwordSet);
  };

  const handleConfirmation = () => {
    setSeedConfirmation((seedConfirmation) => !seedConfirmation);
  };

  return (
    <div className="container">
      {seedConfirmation ? (
        <SeedGeneration />
      ) : passwordSet ? (
        <SeedphraseInstructions handleConfirmation={handleConfirmation} />
      ) : passwordPage ? (
        <CreatePassword handlePasswordSubmit={handlePasswordSubmit} />
      ) : existingAccount ? (
        <AccountRecovery />
      ) : (
        <Welcome
          handleNewAccount={handleNewAccount}
          handleExistingAccount={handleExistingAccount}
        />
      )}
    </div>
  );
}
