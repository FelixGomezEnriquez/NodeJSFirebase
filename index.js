// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { addDoc } from "firebase/firestore/lite";

import express from "express";
import body_parser from "body-parser";
import path from "path";

const firebaseConfig = {
  apiKey: "AIzaSyC76NuM74qzlUWvQ_sGWMPbZyOV1kQt3b8",
  authDomain: "televisores-b702a.firebaseapp.com",
  projectId: "televisores-b702a",
  storageBucket: "televisores-b702a.appspot.com",
  messagingSenderId: "1044958963061",
  appId: "1:1044958963061:web:584b49793fbd8d59e15f3c",
  measurementId: "G-GXRTREFH8X",
};

const fireapp = initializeApp(firebaseConfig);

const db = getFirestore(fireapp);

const app = express();
app.use(body_parser.json());
const router = express.Router(); 
var __dirname = path.resolve(); //Resuelve y adapta para módulos ES6

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

router.post("/insertar", (req, res) => {
  console.log(req.body);
  console.log(req.body.marca);

  let marca = req.body.marca;
  let calidadImagen = req.body.calidadImagen;

  insertar(db, marca, calidadImagen); 
  res.status(200).send("OK");
});

router.get("/leer", (req, response) => {

  leer(db).then((res) => {
    console.log(res);
    response.json(res);
  });
  
});

app.use("/", router);
app.use(express.static(__dirname)); //IMPORTANTE carga archivos js,css, etc.., cargados en los html desde directorio
app.listen(3000);
console.log("Escuchando en puerto 3000");

async function leer(db) {
  const televisores = collection(db, "televisores");
  const televisoresSnapshot = await getDocs(televisores);
  const televisoresList = televisoresSnapshot.docs.map((doc) => doc.data());
  return JSON.stringify(televisoresList);
}

async function insertar(db, marca, calidadImagen) {
  
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "televisores"), {
    marca: marca,
    calidadImagen: calidadImagen,
  });
}
