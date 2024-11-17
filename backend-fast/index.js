const express = require("express");
const dbConnection = require("./configs/dbConfig");
require("dotenv").config();
const cors = require("cors");
const mainPageRoutes = require("./routes/mainPageRoutes");
const footerPageRoutes = require("./routes/footerPageroutes");
const app = express();
// MONGODB CONNECTION
dbConnection();

// Middleware
app.use(express.json());
app.use(cors());
// app.use("/api", verifyToken);
// app.use(handleErrors);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/footer", footerPageRoutes);
app.use("/api/tmdb", mainPageRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
