import React, { useEffect, useState } from "react";

import AccountsTable from "../components/AccountsTable";
import { ethers } from "ethers";

export default function Accounts(props) {
  const mnemonic =
    "balcony awkward taxi brass sick choose tissue gloom home finger kangaroo rubber";
  const privateKeys = [
    "0xaf078ec6124be97c001e88a7bf807f0c0b4bb9588701bd51d8e3af5c80cf6c01",
    "0x9451bd53893abc9fe1084ea985e49f8356a4962ab0e432d23a4246a54d74541d",
    "0xf70a161187da3ce089cb28463ab3b9cffd54bada9bcd9615c12504a37aa803f5",
    "0x9bfe06e88f920fab9133d5687bef838cb632e2175aa62d9b62555644c8c1985a",
    "0xf7f5b29f7429aedec9f907245261f50eceb0013993692f6e51984b985558073f",
    "0x13f2701d4e686c14fa5bde2db4cb5eb50bd3e103873cde67d9822eef83c6f8fe",
    "0x91eb28c0328739bd978c59049c1264eaf1c152bd5f2bafe9b249c6e5f4470473",
    "0xeba1eb592bc0eced331ca249d7f5ae71aaeecc10e2a6c91ab66bcf35892a3a6a",
    "0x97f7b99a8b5d29774f5d6d1d9395721bae656e1b5c6c9d44ce37c529acf30d42",
    "0xcb5738cd47fd78188132cc4424705aa412d84c8563c751a6ef77da034293bdf2",
  ];

  const [accounts, setAccounts] = useState([]);

  const fetchAccounts = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "HTTP://127.0.0.1:8545"
    );
    //list all the accounts and balances of each account
    const addresses = await provider.listAccounts();
    //Save into the state the balance of each account
    const balances = await Promise.all(
      addresses.map(async (address) => {
        const Auxbalance = await provider.getBalance(address);
        //transform bigNumber to string
        let balance = ethers.utils.formatEther(Auxbalance);
        return { address, balance };
      })
    );
    setAccounts(balances);
  };

  const sendTransaction = async (address, mode = 0) => {
    let wallet;
    let signer;
    //connect to provider
    if (mode == 0) {
      const provider = new ethers.providers.JsonRpcProvider(
        "HTTP://127.0.0.1:8545"
      );
      //find the PK of the selected account
      let index = -1;
      accounts.forEach((account) => {
        if (account.address === props.selectedAccount) {
          index = accounts.indexOf(account);
        }
      });
      if (index === -1) {
        alert("Please select an account");
        return;
      }
      const pk = privateKeys[index];
      //create a wallet instance to send the transaction
      wallet = new ethers.Wallet(pk, provider);
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
    }

    const transaction = {
      to: address,
      value: ethers.utils.parseEther("1"),
    };
    if (mode == 0) {
      const response = await wallet.sendTransaction(transaction);
    }
    else{
      const response = await signer.sendTransaction(transaction);
    }
    fetchAccounts();
  };

  const changeAccount = (address) => {
    let index = -1;
    accounts.forEach((account) => {
      if (account.address === address) {
        index = accounts.indexOf(account);
      }
    });
    if (index === -1) {
      alert("This account is not available");
      return;
    }
    props.changeAccount(address, privateKeys[index]);
  }

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Accounts</h2>
      <AccountsTable
        accounts={accounts}
        changeAccount={(address) => changeAccount(address)}
        sendTransaction={sendTransaction}
      />
    </main>
  );
}
