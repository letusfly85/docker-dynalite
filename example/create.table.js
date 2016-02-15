var AWS = require('aws-sdk')
AWS.config.loadFromPath('credential.json');

var dynamo = new AWS.DynamoDB({region: 'us-east-1', endpoint: 'http://*.*.*.*'})
dynamo.listTables(console.log.bind(console))

var params = {
    TableName : "Movies",
    KeySchema: [       
        { AttributeName: "year", KeyType: "HASH"},  //Partition key
        { AttributeName: "title", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "year", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamo.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

dynamo.describeTable(params, function(err, data) {
    if (err) {
        console.log(err, err.stack);
    } else {
        console.log(data);
        // php.var_dump(data);
    }
});

dynamo.listTables(console.log.bind(console))
