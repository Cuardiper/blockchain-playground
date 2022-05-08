import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeployButton from "./DeployButton";

function createData(Name, Address) {
  return { Name, Address };
}

export default function ContractsTable(props) {
  const rows = [];
  let contracts = props.smartContracts;

  

  contracts.forEach((contract, index) => {
    rows.push(createData(contract, '-'));
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
          {rows.map((row, index) => (
            <TableRow
              key={row.Address}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Name}
              </TableCell>
              <TableCell>{row.Address}</TableCell>
              <TableCell align="right">
                <DeployButton index={index} privateKey={props.privateKey} IndexedDB={props.IndexedDB} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
