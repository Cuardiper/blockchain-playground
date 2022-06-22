import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TransferButton from "./TransferButton";
import { Button } from "@mui/material";

function createData(Address, Balance) {
  return { Address, Balance };
}

export default function AccountsTable(props) {
  const rows = [];
  props.accounts.forEach((account) => {
    rows.push(createData(account.address, account.balance));
  });

  const changeToSelectedAccount = (address) => {
    
    props.changeAccount(address);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell align="right">Balance</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Address}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Address}
              </TableCell>
              <TableCell align="right">{row.Balance}</TableCell>
              <TableCell align="right">
                <Button onClick={() => changeToSelectedAccount(row.Address)}>
                  Select
                </Button>{" "}
                <TransferButton sendTransaction={props.sendTransaction} address={row.Address} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
