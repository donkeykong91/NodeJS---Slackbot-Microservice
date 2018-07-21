'use strict';


const RtmClient = require('@slack/client').RTMClient;   

{let rtm = null;
 let nlp = null;


    function handleOnAuthenticated(rtmStartData) {

        console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);

    }


    function handleOnMessage(message) {
        
        nlp.ask(message.text, function (err, res) {

            if(err) {

                console.log(err);

                return;

            }


            if (!res.intent) {

                return rtm.sendMessage("Sorry, I don't know what you are talkng about.", message.channel);

            }


            rtm.sendMessage("Sorry, I did not understand.", message.channel)

        });


    }


    function addAuthenticatedHandler(rtm, handler) {

        rtm.on("authenticated", handler);

    }


    module.exports.init = function slackClient(token, logLevel, nlpClient) {

        rtm = new RtmClient(token, {logLevel: logLevel});

        nlp = nlpClient;

        addAuthenticatedHandler(rtm, handleOnAuthenticated);

        rtm.on("message", handleOnMessage);

        return rtm;

    }


    module.exports.addAuthenticatedHandler = addAuthenticatedHandler;

}
