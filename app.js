const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");
const alternativeRoutes = require("./src/routes/alternativeRoutes");
const criteriaRoutes = require("./src/routes/criteriaRoutes");
const evaluationRoutes = require("./src/routes/evaluationRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/criteria", criteriaRoutes);
app.use("/api/alternatives", alternativeRoutes);
app.use("/api/evaluations", evaluationRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
