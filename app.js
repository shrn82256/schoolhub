const express = require("express");
const cors = require("cors");

const { School } = require("./models/schema");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  School.query()
    .orderBy("pid", "asc")
    .then(schools => {
      res.json(schools);
    });
});

app.get("/:id", (req, res) => {
  School.query()
    .where("id", req.params.id)
    .then(school => {
      res.json(school);
    });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Now listening for requests on port ${process.env.PORT || 5000}.`
  );
});
