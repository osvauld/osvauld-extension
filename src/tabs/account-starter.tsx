import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import CreatePassword from "./components/CreatePassword";
import AccountRecovery from "./components/AccountRecovery";
import SeedphraseInstructions from "./components/SeedphraseInstructions";
import SeedGeneration from "./components/SeedGeneration";
import SeedConfirmation from "./components/SeedConfirmation";
import SuccessMessage from "./components/SuccessMessage";

import "./style.css";

export default function AccountStarter() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/create-password" element={<CreatePassword />} />
          <Route path="/account-recovery" element={<AccountRecovery />} />
          <Route
            path="/seedphrase-instructions"
            element={<SeedphraseInstructions />}
          />
          <Route path="/seed-generation" element={<SeedGeneration />} />
          <Route path="/seed-confirmation" element={<SeedConfirmation />} />
          <Route path="/success-message" element={<SuccessMessage />} />
        </Routes>
      </div>
    </Router>
  );
}
