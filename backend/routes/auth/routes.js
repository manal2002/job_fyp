const express = require("express");
const authRouter = express.Router();

const { OAuth2Client } = require("google-auth-library");
const { register, login } = require("../../controllers/auth/authController");
const client = new OAuth2Client(process.env.GOOGLE_CLIENTID);

authRouter.get("/", (req, res) => {
  res.send("auth router called");
});

authRouter.post("/google-login", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();

  // upsert(users, { name, email, picture });
  // res.status(201);
  // res.json({ name, email, picture });
});

authRouter.post("/login", async (req, res) => {
  await login(req.body).then((response) => {
    res.send(response);
  });
});

authRouter.post("/register", async (req, res) => {
  await register(req.body).then((response) => {
    res.send(response);
  });
});

module.exports = authRouter;
