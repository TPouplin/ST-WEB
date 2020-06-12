
const get = require('./get').handle
const uuid = require('uuid');
const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    const data = JSON.parse(event.body);

    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }
    const dynamoDb = new DynamoDB.DocumentClient();

    const item = {
        type: 'rating',
        uuid: uuid.v1(),
        user_id: data.user_id,
        film_id: data.film_id,
        score: data.score,
        createdAt: Date.now(),
    }

    await dynamoDb.put({
        TableName: process.env.tableName,
        Item: item,
    }).promise();

    
    const film =  JSON.parse((await get({"pathParameters" : {"id":data.film_id}})).body);
    
    console.log(film)
    

    
    dynamoDb.update({
        TableName: process.env.tableName,
        Key:{
            "type": "movie",
            "uuid": data.film_id
        },
        UpdateExpression: "set rating.#nu =:n, rating.mean =:m",
        ExpressionAttributeNames:{
            "#nu" : "number",
        },
        ExpressionAttributeValues:{
            ":n": film.rating.number + 1,
            ":m": (film.rating.mean*film.rating.number + data.score)/(film.rating.number+1),
        },
        ReturnValues:"UPDATED_NEW"
    
    }, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    });

    const film2 =  JSON.parse((await get({"pathParameters" : {"id":data.film_id}})).body);
    
    console.log(film2);
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
        body: JSON.stringify(item),
    }
}

