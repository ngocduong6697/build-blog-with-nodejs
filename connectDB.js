if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  const mongoose = require("mongoose");

  const connectDB = async () => {
    const db = process.env.DB_URL;
    try {
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });

      console.log("MongoDB Connected...");
    } catch (err) {
      console.error(err.message);
      // Exit process with failure
      process.exit(1);
    }
  };

module.exports = connectDB;