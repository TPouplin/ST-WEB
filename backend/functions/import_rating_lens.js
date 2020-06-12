const DynamoDB = require('aws-sdk/clients/dynamodb');
const uuid = require('uuid');
const csv = require('jquery-csv');
const readline = require('readline');
const create_rating = require('./create_ratings').handle;
const list_film = require('./list_film').handle;

function check_film(film_id, list_film){
    var s = false;
    for (x in list_film){
        // console.log(x);
        // console.log(user_id);
        if (x === film_id) {
            s = true
        }; };
    return s
};



module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    };

    const dynamoDb = new DynamoDB.DocumentClient();
    const fs = require('fs');
    const readInterface = readline.createInterface({
        input: fs.createReadStream('u.txt'),
        console: false
    });



    var items =[];
    var count = 0;
    readInterface.on('line', function(line) {
        const entre = line.split("\t");
            items.push({
                type: 'rating',
                uuid: uuid.v1(),
                user_id: entre[0],
                film_id: entre[1],
                score: entre[2],
                createdAt: Date.now(),
            });
    });
    readInterface.on('close', async function () {
        const list_film1 = JSON.parse((await list_film()).body);
        var list_film2  = [];
        for (var i = 0; i < Object.values(list_film1).length; i++){
            list_film2.push(list_film1[i].uuid)};

        console.log(items)
        var count = 0;
        for (var i = 0; i < items.length; i++){
            console.log(count);
            
            if (check_film(items[i].film_id,list_film2)) {
                count += 1;
                create_rating({"body": {"user_id" : items[i].user_id , "film_id" : items[i].film_id , "score"  : items[i].score}}).then(function (){});
            };
        }});
  
}