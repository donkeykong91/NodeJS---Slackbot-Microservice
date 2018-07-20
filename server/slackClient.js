'use strict';


const RtmClient = require('@slack/client').RTMClient;   


function handleOnAuthenticated(rtmStartData) {

    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);

}


function handleOnMessage(message) {
    
    console.log(message);

}


function addAuthenticatedHandler(rtm, handler) {

    rtm.on("authenticated", handler);

}


module.exports.init = function slackClient(token, logLevel) {

    const rtm = new RtmClient(token, {logLevel: logLevel});

    addAuthenticatedHandler(rtm, handleOnAuthenticated);

    rtm.on("message", handleOnMessage);

    return rtm;

}


module.exports.addAuthenticatedHandler = addAuthenticatedHandler;