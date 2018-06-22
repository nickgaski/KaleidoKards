const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var KaleidoKards = require('./utils/kaleidoKards.js');
var KaleidoConfig = require('./utils/KaleidoConfig.js');

var kaleidoKardsInstance;
var kaleidoConfigInstance;

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// only returns contract address for now
app.post('/launch', (req, res) => {

    if (kaleidoKardsInstance && kaleidoKardsInstance.deployed) {
        res.status(200).send(kaleidoKardsInstance.contractAddress);
        return;
    }

    console.log(req);

    if (!req.body.apiKey) {
        res.status(500).send({error: "No Api Key in body"});
        return;
    }


    var kaleidoKardConfig = new KaleidoConfig(req.body.apiKey);
    if (kaleidoKardConfig.previousInstance) {
        kaleidoKardsInstance = new KaleidoKards();
        kaleidoKardsInstance.contractAddress = kaleidoKardConfig.contractAddress;
        res.status(200).send(kaleidoKardsInstance.contractAddress);
        return;
    }

    // Previous instance does'n exist
    console.log("No previous instance found!");
    console.log("***Creating new kaleidoConfig now");
    kaleidoKardConfig.launch().then(() => {
        console.log("kaleidoconfig.then");
        kaleidoKardsInstance = new KaleidoKards();
        kaleidoKardsInstance.deploy().then(() => {
            console.log("contractinstance.then");
            kaleidoKardConfig.contractAddress = kaleidoKardsInstance.contractAddress;
            kaleidoKardConfig.writeKeyFile();
            res.status(200).send({contractAddress: kaleidoKardsInstance.contractAddress});
            return;
        }).catch((error) => {
            console.log("Here's an error ", error);

            res.status(500).send({error: error});
            return;
        });
    });

});



app.post('/purchase', (req, res) => {
    console.log(kaleidoKardsInstance.contractAddress);
    res.status(200).send({name: 'fred'})
});

app.listen(3001, () => {
   console.log('listening on port 3000');
});