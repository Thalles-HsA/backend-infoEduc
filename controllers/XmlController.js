const Xml = require("../models/Xml");
const fs = require("fs")
const path = require("path")

const mongoose = require("mongoose");

// Insert a Xml
const insertXml = async (req, res) => {

  const { title } = req.body;
  const xml = req.file.filename;

  // Create xml
  const newXml = await Xml.create({
    xml,
    title,
    data: new Date()
  });

  // If user was photo sucessfully, return data
  if (!newXml) {
    res.status(422).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
    return;
  }

  res.status(201).json(newXml);
};

const getAllXml = async (req, res) => {
  const xml = await Xml.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(xml);
};

const getXml = async (req, res) => {
  const { id } = req.params;

  const xml = await Xml.findById(new mongoose.Types.ObjectId(id));

  // Check if photo exists
  if (!xml) {
    res.status(404).json({ errors: ["XML não encontrado!"] });
    return;
  }

  res.status(200).json(xml);
};

const deleteXml = async (req, res) => {
  const { id } = req.params;

  const xml = await Xml.findById(new mongoose.Types.ObjectId(id));

  // Check if xml exists
  if (!xml) {
    res.status(404).json({ errors: ["Xml não encontrado!"] });
    return;
  }


  const file = xml.xml
  const caminhoArquivo = (`uploads/${file}`)

  await Xml.findByIdAndDelete(xml._id);

  fs.unlink(caminhoArquivo, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`${caminhoArquivo} foi excluído com sucesso!`);
  });

  res
    .status(200)
    .json({ id: xml._id, message: "Arquivo excluído com sucesso." });
};

const downloadXml = async (req, res) => {

  const { id } = req.params;

  const xml = await Xml.findById(new mongoose.Types.ObjectId(id));

  const file = xml.xml
  const caminhoArquivo = path.join(__dirname, '../uploads', file);

  res.set('Content-Disposition', `attachment; filename=${xml.xml}`);


  res.sendFile(caminhoArquivo, file);

}


module.exports = {
  insertXml,
  getAllXml,
  deleteXml,
  getXml,
  downloadXml,
};