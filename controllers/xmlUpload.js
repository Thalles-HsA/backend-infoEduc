const multer = require("multer");
const path = require("path");

// Destination to store image
const xmlStorage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const xmlUpload = multer({
  storage: xmlStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(xml)$/)) {
     
      return cb(new Error("Por favor, envie apenas xml!"));
    }
    cb(undefined, true);
  },
});

module.exports = { xmlUpload };
