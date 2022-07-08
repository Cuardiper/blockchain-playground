import { PropaneSharp } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import ContractsTable from "../components/ContractsTable";

//INDEXED DB
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;
if (!indexedDB) {
  alert("IndexedDB could not be found in this browser.");
} else {
  console.log("IndexedDB found in this browser.");
}

let db;
var request = indexedDB.open("ContractsDB", 1);

request.onerror = function() {
  alert("Database could not be opened");
  console.log("Database error: " + request.errorCode);
};

request.onsuccess = function() {
  db = request.result;

  console.log("IndexedDB opened successfully");
  return db;
};

request.onupgradeneeded = function() {
  let db = request.result;
  var objectStore = db.createObjectStore("Contracts", {
    keyPath: "id",
    autoIncrement: true,
  });
  objectStore.createIndex("name", "name", { unique: false });
  objectStore.createIndex("address", "address", { unique: true });
  console.log("Database upgrade needed");
};
/////END INDEXED DB/////

export default function SmartContracts(props) {
  const [smartContracts, setsmartContracts] = useState([]);
  const [filesContent, setFilesContent] = useState([]);
  const [IndexedDB, setIndexedDB] = useState(db);

  var fs = require("browserify-fs");

  const findSolidityFiles = async () => {
    await fs.readdir("/SmartContracts", function(err, files) {
      if (err) {
        console.log(err);
      } else {
        let names = [];
        let contents = [];
        files.forEach(function(file) {
          if (file.endsWith(".abi")) {
            names.push(file);
            fs.readFile("/SmartContracts/" + file, "utf8", function(err, data) {
              if (err) {
                console.log(err);
              } else {
                contents.push(data);
              }
            });
          }
        });
        setsmartContracts(names);
        setFilesContent(contents);
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
      //Escribe también una entrada en la BD
      const transaction = db.transaction("Contracts", "readwrite");
      const store = transaction.objectStore("Contracts");
      store.put({ id: 1, name: name, address: "", abi: text, bytecode: "" });
      loadContractsFromDB();
    };
    reader.readAsText(e.target.files[0]);
  };

  let loadContractsFromDB = () => {
    const transaction = db.transaction("Contracts", "readwrite");
    const store = transaction.objectStore("Contracts");
    const idQuery = store.getAll();
    idQuery.onsuccess = function() {
      console.log("idQuery", idQuery.result);
      setsmartContracts(idQuery.result);
    };
  };

  useEffect(() => {
    //findSolidityFiles();
    loadContractsFromDB();
    setIndexedDB(db);
  }, []);

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Smart Contracts</h2>
      <div style={{ marginBottom: "2rem" }}>
        <span style={{ marginRight: "1rem" }}>Upload Contract (abi):</span>
        <input
          type="file"
          id="file"
          name="file"
          onChange={(e) => writeFile(e)}
        />
      </div>
      <ContractsTable
        smartContracts={smartContracts}
        privateKey={props.privateKey}
        indexedDB={IndexedDB}
      />
    </main>
  );
}
