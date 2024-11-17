const Footer = require("../models/Footer");

// Create footer
exports.createFooter = async (req, res) => {
  try {
    const { name, icon, to_link } = req.body;

    const newFooter = new Footer({
      name,
      icon,
      to_link,
    });

    await newFooter.save();

    res
      .status(201)
      .json({ message: "Footer added successfully", footer: newFooter });
  } catch (error) {
    console.error("Error saving footer:", error);
    res.status(500).json({ message: "Failed to add footer", error });
  }
};

// Get all footers
exports.getFooters = async (req, res) => {
  try {
    const footers = await Footer.find();
    res.status(200).json(footers);
  } catch (error) {
    console.error("Error fetching footers:", error);
    res.status(500).json({ message: "Failed to fetch footers", error });
  }
};
