import React, { useEffect, useState } from "react";

import AccountsTable from "../components/AccountsTable";
import { ethers } from "ethers";

export default function Accounts() {
  const [accounts, setAccounts] = useState([])

  const fetchAccounts = async () => {
    const provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:8545");
    //list all the accounts and balances of each account
    const addresses = await provider.listAccounts();
    //Save into the state the balance of each account
    const balances = await Promise.all(
      addresses.map(async (address) => {
        const Auxbalance = await provider.getBalance(address);
        //transform bigNumber to string
        let balance = ethers.utils.formatEther(Auxbalance)
        return { address, balance };
      })
    );
    setAccounts(balances);
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