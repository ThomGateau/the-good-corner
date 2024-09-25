import express from "express";
import sqlite3  from "sqlite3";

const db = new sqlite3.Database("good_corner.sqlite");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.get("/ads", (_req, res) => {
  db.all("SELECT * FROM ad", (err, rows) => {
    if(err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  })
}); 

app.post("/ads", (req,res) => {
  const { title, description, owner, price, picture, location } = req.body;
  try {
    const stmt = db.prepare(
      "INSERT INTO ad (title, description, owner, price, picture, location, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );
    const createdAt = new Date();
    stmt.run([
      title, description, owner, price, picture, location, createdAt
    ]);
    res.send('Ad insert into DB');
  } catch (error) {
    console.log(error);
    res.send('Error :' + error);
  }
});

app.delete("/ads/:id", (req,res) => {
  const id = parseInt(req.params.id)
  try {
    const stmt = db.prepare('DELETE FROM ad WHERE id = ?');
    stmt.run([id]);
    res.send("Ad has been deleted");
  } catch (error) {
    console.log(error)
    res.send('Error :' + error);
  }
});

app.put("/ads/:id", (req, res) => {
  db.get(
    "SELECT * FROM ad WHERE id = (?)",
    req.params.id,
    (_err, data: any) => {
      const stmt = db.prepare(
        "UPDATE ad SET title = ?, description = ?, owner = ?, price = ?, picture = ?, location = ?, createdAt = ? WHERE id = ?"
      );
      stmt.run([
        req.body.title ? req.body.title : data.title,
        req.body.description ? req.body.description : data.description,
        req.body.owner ? req.body.owner : data.owner,
        req.body.price ? req.body.price : data.price,
        req.body.picture ? req.body.picture : data.picture,
        req.body.location ? req.body.location : data.location,
        req.body.createdAt ? req.body.createdAt : data.createdAt,
        req.params.id,
      ]);
    });
    res.send('Ad has been updated');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
