import "reflect-metadata";
import express from "express";
import { dataSource } from "./config/db";
import { Ad } from "./entities/Ad";
import { validate } from "class-validator";
import { Categorie } from "./entities/Categorie";
import { Like } from "typeorm";
import { Tag } from "./entities/Tag";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

// Ads
app.get("/ads", async (req, res) => {
  if(req.query.categorie) {
    const adsByCategorie = await Ad.find({ 
      relations : { 
        categorie : true, 
        tags : true 
      }, 
      where : { 
        categorie : { name: req.query.categorie as string } 
      }
     });
    res.send(adsByCategorie);
  } 
  else if (req.query.tag) {
    const adsByTags = await Ad.find({
      relations : {
        categorie: true,
        tags: true
      },
      where : {
        tags: { name : req.query.tag as string }
      }
    });
    res.send(adsByTags);
  } 
  else {
    const ads = await Ad.find({ 
      relations : {
        categorie : true, 
        tags : true
      }
    });
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
  ad.tags = req.body.tags ? req.body.tags : [];

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

app.delete("/categorie/:id", async (req , res) => {
  const id = parseInt(req.params.id);
  const result = await Categorie.delete({id});
  res.send(result);
});

app.put("/categorie/:id", async (req , res) => {
  const id = parseInt(req.params.id);
  try {
    let categorieToUpdate = await Categorie.findOneByOrFail({id});
    categorieToUpdate = Object.assign(categorieToUpdate, req.body);
    const result = await categorieToUpdate.save();
    console.log(result);
    res.send('Category updated ');
  } catch (error) {
    console.log(error);
    res.status(400).send('Error');
  }
});

// Tags

app.get("/tag", async (req , res) => {
  if(req.query.name) {
    const tags = await Tag.find({
      where : {
        name : Like(`${req.query.name}%`)
      }
    })
    res.send(tags);
  } else {
    const tags = await Tag.find();
    res.send(tags);
  }
});

app.post("/tag", async (req , res) => {
  const tag = new Tag();
  tag.name = req.body.name;

  const errors = await validate(tag)
  if(errors.length > 0) {
    console.log(errors);
    res.status(400).send('Invalid input');
  } else {
    const result = await tag.save();
    res.send(result);
  }
});

app.delete("/tag/:id", async (req , res) => {
  const id = parseInt(req.params.id);
  const result = await Tag.delete({id});
  res.send(result);
});

app.put("/tag/:id", async (req ,res) => {
  const id = parseInt(req.params.id);
  try {
    let tagToUpdate = await Tag.findOneByOrFail({id});
    tagToUpdate = Object.assign(tagToUpdate, req.body);
    const result = await tagToUpdate.save();
    console.log(result);
    res.send('Tag updated');
  } catch (error) {
    console.log(error);
    res.status(400).send('Error');
  }
});

// port
app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Server launch on port ${port}`);
});
