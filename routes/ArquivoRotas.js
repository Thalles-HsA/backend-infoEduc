const express = require("express")
const router = express.Router()

const fs = require('fs');


// Controller
const { insertXml, getAllXml, deleteXml, getXml, downloadXml } = require("../controllers/XmlController")


//Middlewares
const { xmlUpload } = require("../middlewares/xmlUpload")
const { validarXML } = require("../middlewares/validaXml")


//Routes
router.post('/validate', xmlUpload.single("xml"), validarXML, insertXml);
router.get("/", getAllXml )
router.get("/:id", getXml)
router.get("/download/:id", downloadXml)
router.delete("/:id", deleteXml)


module.exports = router;