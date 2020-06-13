const express = require('express');
const router = express.Router();
const User = require('../schemas/User');

const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
require("dotenv").config();

const accessTokenSecret = process.env.TOKEN_SECRET;

router.post("/login", async function (req, res) {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign(
            { id: user._id },
            accessTokenSecret
        );


        res.json({
            accessToken,

        });
    } else {
        res.json({ error: "Username or password incorrect" });
    }
});

router.post('/newUser', function (req, res, next) {
    User.create({

        name: req.body.name,
        email: req.body.email,
        password: req.body.password,

    }
    ).then(function (item) {
        res.send(item);
    }).catch(next);

});
module.exports = router;