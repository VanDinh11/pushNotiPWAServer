const subscriptions = {};
var crypto = require("crypto");
const webpush = require("web-push");

// VAPID keys should only be generated only once.
// const vapidKeys = webpush.generateVAPIDKeys();
// console.log(vapidKeys);

const vapidKeys = {
    privateKey: "wIbs-XXZHXO86OW3HS_8MfeDzY2sVxhZhQPR1rTOITw",
    publicKey: "BL1ymBeGQugE9sfkgJ15MOFiUKMWE841byALrDKzx7aPbXTy1eUyV18crsB6_YVcwpuoy5kTQKacDsLTtQ_GAB4"
};

webpush.setVapidDetails("mailto:example@yourdomain.org", vapidKeys.publicKey, vapidKeys.privateKey);

function createHash(input) {
    const md5sum = crypto.createHash("md5");
    md5sum.update(Buffer.from(input));
    return md5sum.digest("hex");
}

function handlePushNotificationSubscription(req, res) {
    const subscriptionRequest = req.body;
    console.log(subscriptionRequest);
    const susbscriptionId = createHash(JSON.stringify(subscriptionRequest));
    subscriptions[susbscriptionId] = subscriptionRequest;
    res.status(201).json({ id: susbscriptionId });
}
function sendPushNotification(req, res) {
    const subscriptionId = req.params.id;
    const pushSubscription = subscriptions[subscriptionId];
    webpush
        .sendNotification(
            pushSubscription,
            JSON.stringify({
                title: "New Product Available ",
                text: "HEY! Take a look at this brand new t-shirt!",
                image: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
                tag: "new-product",
                url: "/new-product-jason-leung-HM6TMmevbZQ-unsplash.html"
            })
        )
        .catch(err => {
            console.log(err);
        });

    res.status(202).json({});
}

module.exports = { handlePushNotificationSubscription, sendPushNotification };
