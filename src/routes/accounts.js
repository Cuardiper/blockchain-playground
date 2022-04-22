import React, { useEffect, useState } from "react";

import AccountsTable from "../components/AccountsTable";
import { ethers } from "ethers";

export default function Accounts() {
  const [accounts, setAccounts] = useState([])

  const fetchAccounts = async () => {
    const provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545");
    const accounts = await provider.listAccounts();
    setAccounts(accounts);
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Accounts</h2>
      <AccountsTable accounts={accounts} />
    </main>
  );
}