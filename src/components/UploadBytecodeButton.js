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

const UploadBytecodeButton = (props) => {

  const hiddenFileInput = React.useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      let c = props.contract;
      c.bytecode = text;
      updateDB(c, props.indexedDB);
    }
    reader.readAsText(file);
  };

  const updateDB = (contract, db) => {
    let transaction = db.transaction(["Contracts"], "readwrite");
    let store = transaction.objectStore("Contracts");
    let request = store.put(contract);
  };

  return (
    <>
      <input
        type="file"
        ref={hiddenFileInput}
        style={{display:'none'}}
        onChange={handleChange}
      />
      <Button
        onClick={handleClick}
      >
        Set Bytecode
      </Button>
    </>
  );
};

export default UploadBytecodeButton;
