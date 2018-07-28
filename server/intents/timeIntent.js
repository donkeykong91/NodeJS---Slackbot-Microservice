'use strict';


const superagentRequest = require("superagent");


module.exports.process = async function process(intentData, registry, callback) {


    {const service = registry.get("time");


        if (intentData.intent[0].value !== "time") {

            return callback(new Error(`Expected time intent, got ${intentData.intent[0].value}`));

        }


        if (!intentData.location) {

            return callback(new Error("Missing location in time intent"));

        }


        if (!service) {

            return callback(false, "No service available");

        }


        {const location = intentData.location[0].value;

         let apiResponse = null


            try {


                apiResponse = await superagentRequest.get(`http://${service.ip}:${service.port}/service/${location}`);


                {let dateAndTime = apiResponse.body.result;

                    return callback(false, `In ${location}, it is now ${dateAndTime}`);

                }


            } catch (error) {


                console.log(error);

                return callback(false, `I had a problem finding out the time in ${location}`);


            }

        }

    }

}