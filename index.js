const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { PhotoModel } = require('./mongodb')

app.use(bodyParser.json());

app.post("/photo", async (req, res) => {
    try {
      const photo = new PhotoModel(req.body);
      await photo.save();
      res.status(201).send(photo);
    } catch (error) {
      res.status(400).send(error);
    }
});

app.get("/photo", async (req, res) => {
    try {
      const photo = await PhotoModel.find();
      res.send(photo);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.get("/photo/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const photo = await PhotoModel.findById(id);
      if (!photo) {
        return res.status(404).send("photo not found");
      }
      res.send(photo);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.put("/photo/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const photo = await PhotoModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!photo) {
        return res.status(404).send("photo not found");
      }
      res.send(photo);
    } catch (error) {
      res.status(400).send(error);
    }
});
  
app.delete("/photo/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const photo = await PhotoModel.findByIdAndDelete(id);
      if (!photo) {
        return res.status(404).send("photo not found");
      }
      res.send(photo);
    } catch (error) {
      res.status(500).send(error);
    }
});
  
app.listen(3000, () => {
    console.log('Starting the server on port 3000');
});

module.exports = app;
//вот такие пироги