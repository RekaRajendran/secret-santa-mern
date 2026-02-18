const express = require("express");
const santaRoutes = require("./routes/santaRoutes");
const errorHandler = require("./middlewares/errorHandler");



const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use("/api/santa", santaRoutes);
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});