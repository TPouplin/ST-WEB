const DynamoDB = require('aws-sdk/clients/dynamodb');
const uuid = require('uuid');
const csv = require('jquery-csv');
const readline = require('readline');

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    };

    const dynamoDb = new DynamoDB.DocumentClient();
    const fs = require('fs');
    const readInterface = readline.createInterface({
        input: fs.createReadStream('u.user'),
        output: process.stdout,
        console: false
    });
    var items =[];
    readInterface.on('line', function(line) {
        const entre = line.split("|");
        items.push({
            type: 'user',
            uuid: entre[0],
            createdAt: Date.now(),
        });
    });
    readInterface.on('close', function () {
        for (var i = 0; i < items.length; i++){
            dynamoDb.put({
                TableName: process.env.tableName,
                Item: items[i],
            }).promise().then(function (){});
    }});
  
}