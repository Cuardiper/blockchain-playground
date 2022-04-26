import React, { useEffect, useState } from "react";

import ContractsTable from "../components/ContractsTable";

export default function SmartContracts() {
  const [smartContracts, setsmartContracts] = useState([]);

  var fs = require("browserify-fs");

  const findSolidityFiles = () => {
    fs.readdir("/SmartContracts", function(err, files) {
      if (err) {
        console.log(err);
      } else {
        let res = [];
        files.forEach(function(file) {
          if (file.endsWith(".sol")) {
            //read file
            fs.readFile("/SmartContracts/" + file, "utf8", function(err, data) {
              if (err) {
                console.log(err);
              } else {
                res.push([file, data]);
              }
            });
          }
        });
        setsmartContracts(res);
      }
    });
  };

  let writeFile = (e) => {
    e.preventDefault();

    fs.mkdir("/SmartContracts", function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Directory created successfully!");
      }
    });

    const name = e.target.files[0].name;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      alert(text);
      fs.writeFile("/SmartContracts/" + name, text, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("File created successfully!");
        }
      });
    };
    reader.readAsText(e.target.files[0]);
  };

  useEffect(() => {
    findSolidityFiles();
  }, []);

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Accounts</h2>
      <div style={{ marginBottom: "2rem" }}>
        <span style={{ marginRight: "1rem" }}>Upload Contract:</span>
        <input
          type="file"
          id="file"
          name="file"
          onChange={(e) => writeFile(e)}
        />
      </div>
      <ContractsTable smartContracts={smartContracts} />
    </main>
  );
}
