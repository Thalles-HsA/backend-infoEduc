const express= require("express")
const router = express()

router.use("/api", require("./ArquivoRotas"))

module.exports = router;
