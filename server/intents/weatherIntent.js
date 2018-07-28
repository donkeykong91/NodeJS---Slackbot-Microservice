'use strict';


const superagentRequest = require("superagent");


module.exports.process = async function process(intentData, registry, callback) {


    {const service = registry.get("weather");


        if (intentData.intent[0].value !== "weather") {

            return callback(new Error(`Expected weather intent, got ${intentData.intent[0].value}`));

        }


        if (!intentData.location) {

            return callback(new Error("Missing location in weather intent"));

        }


        if (!service) {

            return callback(false, "No service available");

        }


        {const location = intentData.location[0].value;

         let apiResponse = null


            try {


                apiResponse = await superagentRequest.get(`http://${service.ip}:${service.port}/service/${location}`);


                {let weather = apiResponse.body.result;

                    return callback(false, `The current weather in ${location} is ${weather}`);

                }


            } catch (error) {


                console.log(error);

                return callback(false, `I had a problem finding out the weather in ${location}`);


            }

        }

    }

}