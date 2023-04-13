const mongoose = require("mongoose");
const { Schema } = mongoose;

const xmlSchema = new Schema(
  {
    xml: String,
    title: String,
    data: {
        type: Date,
        default: Date.now
      }
  },
  {
    timestamps: true,
  }
);

Xml = mongoose.model("Xml", xmlSchema);

module.exports = Xml;
