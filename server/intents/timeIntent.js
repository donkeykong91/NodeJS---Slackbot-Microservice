'use strict';


const superagentRequest = require("superagent");


module.exports.process = async function process(intentData, callback) {


    if (intentData.intent[0].value !== "time") {

        return callback(new Error(`Expected time intent, got ${intentData.intent[0].value}`));

    }


    if (!intentData.location) {

        return callback(new Error("Missing location in time intent"));

    }


    {const location = intentData.location[0].value;

     let locationApiResponse = null


        try {


            {let dateAndTime = locationApiResponse.body.result;


                locationApiResponse = await superagentRequest.get(`http://localhost:3010/service/${location}`);

                return callback(false, `In ${location}, it is now ${dateAndTime}`);


            }


        } catch (error) {


            console.log(error);

            console.log(locationApiResponse.body);


            return callback(false, `I had a problem finding out the time in ${location}`);


        }

    }

}