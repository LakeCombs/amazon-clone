const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe");
("sk_test_51J6041GlSigGOgtlQNsjTprGVTENWWQucI7giVZlqlaXcrnCiXr4RKqnDKE8vYBda7gdLoAYO61Nlbgn8phaZFjR00N2eM75dU");

//API

//App config
const app = express();

//middle wares
app.use(cors({ origin: true }));
app.use(express.json());

//api routes
app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.post("/payments/create", async (req, res) => {
  const total = request.query.total;
  console.log("payment request recieved for this amount ", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //subunit of the currrency
    currency: "usd",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//listen command

exports.api = functions.https.onRequest(app);

//  endpoint
// (http://localhost:5001/signal-7e223/us-central1/api)
