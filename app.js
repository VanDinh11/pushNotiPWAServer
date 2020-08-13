const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const subscriptionHandler = require('./subscriptionHandler')

const app = express();

app.use(
    cors({
        origin(origin, cb) {
            const whitelist = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : [];
            cb(null, whitelist.includes(origin));
        },
        credentials: true
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/save-subscription", subscriptionHandler.handlePushNotificationSubscription);
// app.get("/subscription/:id", subscriptionHandler.sendPushNotification);

module.exports = app;
