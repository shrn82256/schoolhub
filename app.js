const express = require("express");
const path = require("path");
const cors = require("cors");

const { School } = require("./models/schema");

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.get("/api", (req, res) => {
  if (!req.query.page) {
    School.query()
      .orderBy("pid", "asc")
      .then(schools => {
        res.json(schools);
      });
  } else {
    const page = req.query.page;
    const multiplier = 20;

    School.query()
      .orderBy("pid", "asc")
      .offset(page * multiplier)
      .limit(multiplier)
      .then(schools => {
        res.json(schools);
      });
  }
});

app.get("/api/:id", (req, res) => {
  let searchCriteria = isNaN(req.params.id) ? "id" : "pid";
  School.query()
    .where(searchCriteria, req.params.id)
    .then(school => {
      res.json(school);
    });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Now listening for requests on port ${process.env.PORT || 5000}.`
  );
});
