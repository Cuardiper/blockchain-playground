import * as React from "react";
import Button from "@mui/material/Button";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const TransferButton = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleTransfer = (mode) => {
        props.sendTransaction(props.address, mode);
        handleClose();
    };
        

    return (
        <>
        <Button onClick={handleOpen}>
            Transfer
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={style}>
                <Typography variant="h6" id="modal-title">Selecciona una opción</Typography><br/>
                <Button onClick={() => handleTransfer(0)}>Ethers JS</Button>
                <Button onClick={() => handleTransfer(1)}>Metamask</Button>
                <Button onClick={handleClose} color="error" style={{float: "right"}}>Cancel</Button>
            </Box>
        </Modal>        
        </>
    );
};

export default TransferButton;