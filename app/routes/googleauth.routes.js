const express = require("express");
const app = express.Router();
const db = require("../models");
const { OAuth2Client } = require("google-auth-library");
const { gusers } = require("../models");
const client = new OAuth2Client(process.env.CLIENT_ID);

module.exports = function (app) {
  app.post("/api/v1/auth/google", async (req, res) => {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();
    const gusers = await db.gusers.upsert({
    //   where: { email: email },
      // update: { name: name, picture: picture },
      // create: { name: name, email: email, picture: picture }
      id: 12,
      name: name,
      email: email,
      picture: picture,
    });

    res.status(201);
    res.send(gusers);
    req.session.userId = gusers.id;
  });

  app.use(async (req, res, next) => {
    const gusers = await db.gusers.findOne({
      where: { id: req.session.userId },
    });
    req.gusers = gusers;
    next();
  });

  app.delete("/api/v1/auth/logout", async (req, res) => {
    await req.session.destroy();
    res.status(200);
    res.send({
      message: "Logged out successfully",
    });
  });

  app.get("/me", async (req, res) => {
    res.status(200);
    res.send(req.user);
  });
};
