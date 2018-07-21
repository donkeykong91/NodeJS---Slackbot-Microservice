'use strict'


const request = require("superagent");


function handleWitResponse (res) {

    console.log(res);

}


module.exports = function witClient (token) {

    const ask = function ask(message, callback) {


        request.get("https://api.wit.ai/message")

            .set("Authorization", "Bearer " + token)

            .query({v: "20180720"})

            .query({q: message})

            .end(function (err, res) {


                if (err) {

                    return callback(err);

                }


                if (res.statusCode != 200) {

                    return callback("Expected status 200 but got " + res.statusCode);

                }


                const witResponse = handleWitResponse(res.body);

                return callback(null, witResponse);

            });

    }

    return {

        ask: ask

    }

}