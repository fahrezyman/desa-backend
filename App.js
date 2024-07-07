const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sawRoutes = require("./src/routes/sawRoutes");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api", sawRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
