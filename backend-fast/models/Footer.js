const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  to_link: {
    type: String,
    required: true,
  },
});

const Footer = mongoose.model("Footer", footerSchema);

module.exports = Footer;
