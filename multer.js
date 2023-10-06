const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

const uploadObj = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
      console.log(file.originalname);
      const fileName =
        new Date().getTime().toString() + path.extname(file.originalname);
      cb(null, fileName);
    },
  }),
}).single("file_field_name");

app.post("/uploadfile", uploadObj, (req, res, next) => {
  res.send("file uploaded.");
});
app.listen(3000);
