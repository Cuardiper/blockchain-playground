import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { ethers } from "ethers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeployButton = (props) => {

  const handleDeploy = async (contract, pk, db) => {
    if(pk === null) {
      alert("Please select an account");
      return;
    }
    // Connect to the network
    const provider = new ethers.providers.JsonRpcProvider(
      "HTTP://127.0.0.1:8545"
    );

    // Load the wallet to deploy the contract with
    let wallet = new ethers.Wallet(pk, provider);

    // Create an instance of a Contract Factory
    let factory = new ethers.ContractFactory(contract.abi, JSON.parse(contract.bytecode), wallet);

    // Deploy the contract
    let deployedContract = await factory.deploy();

    // The contract is NOT deployed yet; we must wait until it is mined
    await deployedContract.deployed();
    contract.address = deployedContract.address;
    updateAddress(contract, db);
    alert("Contract deployed to: " + deployedContract.address);
  };

  const updateAddress = (contract, db) => {
    let transaction = db.transaction(["Contracts"], "readwrite");
    let store = transaction.objectStore("Contracts");
    let request = store.put(contract);
  };

  return (
    <>
      <Button
        onClick={async () =>
          await handleDeploy(props.contract, props.privateKey, props.indexedDB)
        }
      >
        Deploy
      </Button>
    </>
  );
};

export default DeployButton;
