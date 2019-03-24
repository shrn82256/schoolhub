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

/* router.get("/:id", async (req, res) => {
  const school = await School.query()
    .findById(req.params.id)
    .eager("comments");
  res.json(idea);
}); */

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Now listening for requests on port ${process.env.PORT || 5000}.`
  );
});
