//publisher.js
const mqtt = require("mqtt");
require("dotenv").config();

//the client id is used by the MQTT broker to keep track of clients and and their // state
const clientId = "mqttjs_" + Math.random().toString(8).substr(2, 4);
const client = mqtt.connect("mqtt://test.mosquitto.org", {
  clientId: clientId,
  clean: false,
});
// test.mosquitto.org
// console.log(process.env.BROKER_URL, 'client', clientId)

const topicName = "sudTest1";

client.on("connect", function (connack) {
  console.log("client connected", connack);
  // on client connection publish messages to the topic on the server/broker
  const payload = "Welcome to sudTest1";
  client.publish(
    topicName,
    JSON.stringify(payload),
    { qos: 1, retain: true },
    (PacketCallback, err) => {
      if (err) {
        console.log(err, "MQTT publish packet");
      }
    }
  );

  //assuming messages comes in every 3 seconds to our server and we need to publish or process these messages
  setInterval(() => console.log("Message published"), 3000);
});

client.on("error", function (err) {
  console.log("Error: " + err);
  if (err.code == "ENOTFOUND") {
    console.log(
      "Network error, make sure you have an active internet connection"
    );
  }
});

client.on("close", function () {
  console.log("Connection closed by client");
});

client.on("reconnect", function () {
  console.log("Client trying a reconnection");
});

client.on("offline", function () {
  console.log("Client is currently offline");
});
