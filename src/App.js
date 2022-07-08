import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "./layout/ResponsiveAppBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accounts from "./routes/accounts";
import SmartContracts from "./routes/smartContracts";
import { createTheme, ThemeProvider  } from '@mui/material/styles';
import { blue, lightBlue } from '@mui/material/colors';

import './App.css';

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: lightBlue,
  },
});

function App() {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);

  const changeAccount = (account, pk) => {
    console.log("changeAccount ", account);
    setSelectedAccount(account);
    setPrivateKey(pk);
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ResponsiveAppBar selectedAccount={selectedAccount} />
          <div id="content">
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
              <Route
                path="Smart%20Contracts"
                element={
                  <SmartContracts
                    selectedAccount={selectedAccount}
                    privateKey={privateKey}
                  />
                }
              />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
      
    </div>
  );
}

export default App;
