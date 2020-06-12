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
        input: fs.createReadStream('u.item'),
        output: process.stdout,
        console: false
    });
    var items =[];
    var count = 0;
    readInterface.on('line', function(line) {
        const entre = line.split("|");
        console.log('3')
        count += 1;
        if (count === 30) { readInterface.close();};
        const title = entre[1].split("(")[0];
        console.log(title)
        var tag_entre = [];
        var tag_ref = ["unknown","Action","Adventure","Animation","Children's","Comedy","Crime","Documentary","Drama","Fantasy","Film-Noir","Horror","Musical","Mystery","Romance","Sci-Fi","Thriller","War","Western"];
        for (var i = 0; i < Object.values(tag_ref).length; i++){
            if (entre[5+i] === '1') {
                tag_entre.push(tag_ref[i])
            };
        };

        items.push({
            type: 'movie',
            uuid: entre[0],
            name: title,
            date: entre[2],
            tag: tag_entre,
            lien_imbd : entre[4],
            rating : {
                mean: 0,
                number : 0,
            },
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