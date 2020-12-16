require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors())

mongoose.connect(
  process.env.DB_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => console.log("DB connected")
);

// Core routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user")
const coreRoutes = require("./routes/core")

// Admin routes
const adminCategoryRoutes = require("./routes/admin/category");
const adminItemRoutes = require("./routes/admin/item");
const adminAddOnRoutes = require("./routes/admin/addOn");
const adminOrderRoutes = require("./routes/admin/orderAdmin")

// Core api calls
app.use("/api", authRoutes);
app.use("/api", userRoutes)
app.use("/api", coreRoutes)

// Admin api calls
app.use("/api/admin", adminCategoryRoutes);
app.use("/api/admin", adminItemRoutes);
app.use("/api/admin", adminAddOnRoutes);
app.use("/api/admin", adminOrderRoutes)

const port = process.env.PORT || 8000;
app.listen(port, (req, res) => {
  console.log(`Server is running at ${port}`);
});
