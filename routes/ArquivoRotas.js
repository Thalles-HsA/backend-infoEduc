const express = require("express")
const router = express.Router()

const fs = require('fs');

const multer = require('multer');

const upload = multer()



// Controller
const { xmlUpload } = require("../controllers/xmlUpload")



//Middlewares

const { validarXML } = require("../middlewares/validaXml")


//Routes
router.post('/validate', upload.single("file"), validarXML);
;


module.exports = router;