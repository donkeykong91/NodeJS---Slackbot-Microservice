'use strict';


const RtmClient = require('@slack/client').RTMClient;   

{let rtm = null;


    function handleOnAuthenticated(rtmStartData) {

        console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);

    }


    function handleOnMessage(message) {
        
        console.log(message);

        rtm.sendMessage("this is a test message", message.channel, )

    }


    function addAuthenticatedHandler(rtm, handler) {

        rtm.on("authenticated", handler);

    }


    module.exports.init = function slackClient(token, logLevel) {

        rtm = new RtmClient(token, {logLevel: logLevel});

        addAuthenticatedHandler(rtm, handleOnAuthenticated);

        rtm.on("message", handleOnMessage);

        return rtm;

    }


    module.exports.addAuthenticatedHandler = addAuthenticatedHandler;

}
