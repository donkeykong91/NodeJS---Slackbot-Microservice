'use strict';


const { RTMClient } = require('@slack/client');   


function handleOnAuthenticated(rtmStartData) {

    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);

}


function addAuthenticatedHandler(rtm, handler) {

    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);

}


module.exports.init = function slackClient(token, logLevel) {

    const rtm = new RTMClient(token, {logLevel: "debug"});

    addAuthenticatedHandler(rtm, handleOnAuthenticated);

    return rtm;

}
