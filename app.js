// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

// connect our application to the MongoDB location and add the database name to the URL string
mongoose
  // .connect("mongodb://localhost:27017/photo-gallery", {
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`CONNECTED TO MONGO!`);
  })
  .catch((err) => {
    console.log(`OH NO! MONGO CONNECTION ERROR!`);
    console.log(err);
  });

// create a schema named employeeSchema consisting of three fields
const photoSchema = new mongoose.Schema({
  title: String,
  type: String,
  url: String,
});

// create a model from the photoSchema
const PhotoData = mongoose.model("PhotoData", photoSchema);

// Fetching all the photos
app.get("/photos", (req, res) => {
  PhotoData.find((err, foundPhotos) => {
    if (!err) {
      res.send(foundPhotos);
    } else {
      res.send(err);
    }
  });
});

// Fetching a specific type of photos
app.get("/photos/:type", function (req, res) {
  PhotoData.findOne({ type: req.params.type }, function (err, foundPhotos) {
    if (foundPhotos) {
      res.send(foundPhotos);
    } else {
      res.send("No photo matching that type was found.");
    }
  });
});

// Fetching photos of type 'digital'
// app.get("/photos/digital", function (req, res) {
//   PhotoData.findOne({ type: "digital" }, function (err, foundPhotos) {
//     if (foundPhotos) {
//       res.send(foundPhotos);
//     } else {
//       res.send("No photo matching that type was found.");
//     }
//   });
// });

// Posting a new photo
app.post("/photos", (req, res) => {
  const newPhotoData = new PhotoData({
    title: req.body.title,
    type: req.body.type,
    url: req.body.url,
  });

  // Saving the photo
  newPhotoData.save(function (err) {
    if (!err) {
      res.send("Successfully added a new photo.");
    } else {
      res.send(err);
    }
  });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
