import React, { useState } from "react";
import Welcome from "./components/Welcome";
import CreatePassword from "./components/CreatePassword";
import AccountRecovery from "./components/AccountRecovery";

import "./style.css";

export default function AccountStarter() {
  const [passwordPage, setpasswordPage] = useState(false);
  const [existingAccount, setexistingAccount] = useState(false);

  const handleNewAccount = () => {
    setpasswordPage((passwordPage) => !passwordPage);
  };

  const handleExistingAccount = () => {
    setexistingAccount((existingAccount) => !existingAccount);
  };

  return (
    <div className="container">
      {passwordPage ? (
        <CreatePassword />
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
