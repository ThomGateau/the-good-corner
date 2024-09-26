import "reflect-metadata";
import express from "express";
import { dataSource } from "./config/db";
import { Ad } from "./entities/Ad";
import { validate } from "class-validator";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.get("/ads", async (_req, res) => {
  const ads = await Ad.find();
  res.send(ads);
}); 

app.post("/ads", async (req,res) => {
  const ad = new Ad();
  ad.title = req.body.title;
  ad.description = req.body.description;
  ad.owner = req.body.owner;
  ad.price = req.body.price;
  ad.picture = req.body.picture;
  ad.location = req.body.location;
  ad.createdAt = req.body.createdAt;

  const errors = await validate(ad);
  if (errors.length > 0) {
    console.log(errors);
    // throw new Error("Validation failed");
    res.status(400).send("Invalid input");
  } else {
    const result = await ad.save();
    res.send(result);
  }
});

app.delete("/ads/:id", async (req,res) => {
  const id = parseInt(req.params.id);
  const result = await Ad.delete({id});
  res.send(result);
});

app.put("/ads/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let adToUpdate = await Ad.findOneByOrFail({id});
    adToUpdate = Object.assign(adToUpdate, req.body);
    const result = await adToUpdate.save();
    console.log(result);
    res.send("Ad has been updated");
  } catch (error) {
    console.log(error);
    res.status(400).send('Invalid request');
  }
});

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Server launch on port ${port}`);
});
