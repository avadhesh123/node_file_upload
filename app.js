const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "public", "temp"),
  })
);
app.get("/", async (req, res, next) => {
  res.render("file-upload");
  res.end();
});
app.post("/uploadFile", async (req, res, next) => {
  const file = req.files.myfile;
  console.log(file);
  const fileName = new Date().getTime().toString() + path.extname(file.name);
  console.log(fileName);
  const savePath = path.join(__dirname, "public", "uploads", fileName);
  await file.mv(savePath);
  res.redirect("/");
});

app.get("/uploadFileTest", async (req, res, next) => {
  res.render("file-upload-test");
  res.end();
});
app.post("/uploadFileTest", async (req, res, next) => {
  let file = req.files.myfile;
  const savePath = path.join(__dirname, "public", "uploads", file.name);
  await file.mv(savePath);
  res.redirect("/uploadFileTest?p");
});

app.get("/uploadMultipleFile", async (req, res, next) => {
  res.render("file-multi-upload");
  res.end();
});

app.post("/uploadMultipleFile", async (req, res, next) => {
  const files = req.files.myfile;

  const promises = files.map((file) => {
    const fileName = new Date().getTime().toString() + path.extname(file.name);
    const savePath = path.join(__dirname, "public", "uploads", "m" + fileName);
    return file.mv(savePath);
  });

  await Promise.all(promises);
  res.redirect("/uploadMultipleFile");
});



app.listen("3000",() => {
  console.log("Server running on port 3000.");
});
