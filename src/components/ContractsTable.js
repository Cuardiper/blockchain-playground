import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeployButton from "./DeployButton";
import UploadBytecodeButton from "./UploadBytecodeButton";

function createData(id, name, address, abi, bytecode) {
  return { id, name, address, abi, bytecode };
}

export default function ContractsTable(props) {
  const rows = [];
  let contracts = props.smartContracts;

  contracts.forEach((contract) => {
    rows.push(
      createData(
        contract.id,
        contract.name,
        contract.address,
        contract.abi,
        contract.bytecode
      )
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Contract</TableCell>
            <TableCell>Address</TableCell>
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
                {row.name}
              </TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell align="right">
                <UploadBytecodeButton
                  contract={row}
                  indexedDB={props.indexedDB}
                />
                <DeployButton
                  contract={row}
                  privateKey={props.privateKey}
                  indexedDB={props.indexedDB}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
