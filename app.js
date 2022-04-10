const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("./db");
const authRoutes = require("./routes/auth");
const restrauntsRoutes = require("./routes/restraunts");

const port = process.env.PORT || 3001;

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api", restrauntsRoutes);

app.listen(port, () => `server running on ${port}`);
