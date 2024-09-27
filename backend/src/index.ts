import "reflect-metadata";
import express from "express";
import { dataSource } from "./config/db";
import { Ad } from "./entities/Ad";
import { validate } from "class-validator";
import { Categorie } from "./entities/Categorie";
import { Like } from "typeorm";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.get("/ads", async (req, res) => {
  if(req.query.categorie) {
    const adsByCategorie = await Ad.find({ 
      relations : { categorie : true }, 
      where : { 
        categorie : { name: req.query.categorie as string } 
      }
     });
    res.send(adsByCategorie);
  } else {
    const ads = await Ad.find({ relations : {categorie : true}});
    res.send(ads);
  }
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
  ad.categorie = req.body.categorie ? req.body.categorie : 3;

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

// categorie

app.get("/categorie", async (req , res) => {
  if(req.query.name) {
    const categorie = await Categorie.find({ 
      where :{ name : Like(`${req.query.name as string}%`)  }
    });
    res.send(categorie);
  } else {
    const categories = await Categorie.find();
    res.send(categories);
  }
});

app.post("/categorie", async (req , res) => {
  const categorie = new Categorie();
  categorie.name = req.body.name;
  
  const errors = await validate(categorie);
  if(errors.length > 0 ) {
    console.log(errors)
    res.status(400).send("Invalid input");
  } else {
    const result = await categorie.save();
    res.send(result);
  }
});

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Server launch on port ${port}`);
});
