"use strict";


const slackClient = require("../server/slackClient");

const service = require("../server/service");

const http = require("http");

const server = http.createServer(service);


const witToken = process.env.WIT_TOKEN;

const witClient = require("../server/witClient")(witToken);


const slackToken = process.env.SLACK_TOKEN;

const slackLogLevel = 'info';


const serviceRegistry = service.get("serviceRegistry");

const rtm = slackClient.init(slackToken, slackLogLevel, witClient, serviceRegistry);

rtm.start();


slackClient.addAuthenticatedHandler(rtm, function () {

    server.listen(3000);

});


server.on("listening", function() {

    console.log(`IRIS is listening on ${server.address().port} in ${service.get("env")} mode.`);

});