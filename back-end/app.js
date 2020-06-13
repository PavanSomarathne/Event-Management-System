const express = require('express');
const fis=require('fs');
const path=require('path');
const Parsbdy = require('body-parser');
const mongoose = require('mongoose');

const eventRoutes = require('./routings/EventRoutes');
const userRoutes = require('./routings/UserRoutes');



const app = express();
const cors = require("cors");


require("dotenv").config();

const port = process.env.PORT || 5000;
const mongouri = process.env.ATLAS_URI;

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: GET, POST,PUT,PATCH, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoose
  .connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected…");
  })
  .catch((err) => console.log(err));

  app.use(Parsbdy.json());

app.use('/event', eventRoutes);
app.use('/user', userRoutes);



//custom error handling
app.use((req, res, next) => {
  if (req.file) {
    fis.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  const Er = new Error("Not Found");
  Er.status = 404;
  next(Er);
});

// app.use(function (erro, rq, res, next) {
//   res.status(422).send({ error: erro.message });
// });

//custom error handling
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, function () {
  console.log(`Server is running on port: ${port}`);
});
