const fs = require('fs');
const libxmljs = require('libxmljs');
const path = require("path");


const validarXML = async (req, res, next) => {

  if (!req.file) {
    return res.status(400).json({ error: 'Arquivo XML não encontrado na requisição' });
  }

  // const xmlString = req.file.buffer.toString('utf-8');
  const xmlString = fs.readFileSync(req.file.path, 'utf-8');

  const xsdString = fs.readFileSync('./files/Educacao.xsd', 'utf-8');

  const xmlDoc = libxmljs.parseXml(xmlString);
  const xsdDoc = libxmljs.parseXml(xsdString);

  const validationResult = {
    valid: xmlDoc.validate(xsdDoc),
    errors: xmlDoc.validationErrors.map((error) => ({
      line: error.line,
      column: error.column,
      message: error.message,
    })),
  };

 
  if (!xmlDoc.validate(xsdDoc)) {
    const files = fs.readdirSync('uploads/');
    const lastFile = files.pop();
    fs.unlinkSync(`uploads/${lastFile}`);

    return res.json(validationResult);
  }

  next();

  // const uploadsPath = './uploads';
  // const fileName = Date.now() + '_' + req.file.originalname;
  // const filePath = path.join(uploadsPath, fileName);
  
  // fs.writeFile(filePath, req.file.buffer, (err) => {
  //   if (err) {
  //     return res.status(500).json({ error: 'Não foi possível salvar o arquivo no sistema' });
  //   }
  
  //   const validationResult = {
  //     valid: true,
  //     errors: []
  //   };
  
  //   res.status(200).json(validationResult);
  //   console.log('Arquivo salvo com sucesso em ' + filePath);
  // });
  

}

module.exports = {
  validarXML,
};