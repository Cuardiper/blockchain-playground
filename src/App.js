import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "./layout/ResponsiveAppBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accounts from "./routes/accounts";
import SmartContracts from "./routes/smartContracts";

function App() {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const changeAccount = (account) => {
    console.log("changeAccount ", account);
    setSelectedAccount(account);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveAppBar selectedAccount={selectedAccount} />
        <Routes>
          <Route path="/" element={<div>INICIO</div>} />
          <Route
            path="Accounts"
            element={
              <Accounts
                selectedAccount={selectedAccount}
                changeAccount={changeAccount}
              />
            }
          />
          <Route path="Smart%20Contracts" element={<SmartContracts />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
