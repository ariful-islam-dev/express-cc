const express = require("express");

const morgan = require("morgan");
const mongoose = require("mongoose");
const { createPollGetController, createPollPostController, getAllPolls } = require("./pollController");
const port = process.env.PORT || 4000;

const app = express();

app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/create", createPollGetController);
app.post('/create', createPollPostController)

app.get('/polls', getAllPolls)

app.get("/", (req, res) => {
  res.render("home");
});

mongoose
  .connect("mongodb://localhost:27017/express-cc")
  .then(() => {
    app.listen(port, () => {
      console.log(`Application is ready to server ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
