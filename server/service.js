"use strict"


{const express = require("express");

 const service = express();


    {let request = null;

     let respond = null;

     let next = null;


        service.get("/service/:intent/:port", async function (expressRequest, expressRespond, expressNext) {

            request = expressRequest;

            respond = expressRespond;

            next = expressNext;

            
            try {
                
                await GetServiceIntentAndIp();
                
            } catch (error) {

                console.log(error);

            }

        });

        
        function GetServiceIntentAndIp () {


            var serviceIntent = request.params.intent;

            var servicePort = request.params.port;


            var serviceIp = request.connection.remoteAddress.includes("::") ? 

                                    `[${request.connection.remoteAddress}]` : 

                                        request.connection.remoteAddress;


            return new Promise( function executor (resolve, reject) {

                resolve(respond.json({result: `${serviceIntent} at ${serviceIp}:${servicePort}`}));

                reject(new Error("Could not get either intent, ip, or port number"));

            });
            
        }

    }

    module.exports = service;

}