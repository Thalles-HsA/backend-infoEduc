const express = require("express")
const router = express.Router()

const fs = require('fs');


// Controller
const { insertXml, getAllXml, deleteXml, getXml, downloadXml } = require("../controllers/XmlController")


//Middlewares
const { xmlUpload } = require("../middlewares/xmlUpload")
const { validarXML } = require("../middlewares/validaXml")


//Routes
// router.post('/validate', xmlUpload.single("xml"), console.log("validando"), validarXML, insertXml);
router.post('/validate', xmlUpload.single("xml"), (req, res, next) => {
    console.log("validando");
    validarXML(req, res, next);
  }, insertXml);
router.post('/salvar', xmlUpload.single("xml"), insertXml);
router.get("/", getAllXml )
router.get("/:id", getXml)
router.get("/download/:id", downloadXml)
router.delete("/:id", deleteXml)


module.exports = router;