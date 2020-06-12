const get_user_ratings = require('./get_user_ratings').handle;
const estimation =  require('./model_based').estimation;

const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    user_id = ((event.body)).user_id
    user_ratings = (await get_user_ratings(({"user_id" : user_id}))).body;
    var keys = [];
    for(var k in user_ratings) keys.push(k);
    const dynamoDb = new DynamoDB.DocumentClient();
    var not_rated_films = await dynamoDb.scan({
        TableName: process.env.tableName,
        ProjectionExpression: "#na, #id, #da,tag, rating ",
        FilterExpression: "(not contains(:keys, #id)) and #type = :type",
        ExpressionAttributeNames: {
            "#id": "uuid",
            "#na":"name",
            "#type": "type",
            "#da" : "date"
        },
        ExpressionAttributeValues: {
            ":qna": event.name,
            ":keys": keys,
            ":type": "movie"
        },
    }).promise();
    not_rated_films = not_rated_films.Items
    for (var i = 0; i < Object.values(not_rated_films).length; i++){
        not_rated_films[i].new_rating = await estimation({"body": {"user_id": user_id, "film_id": not_rated_films[i].uuid}})
        console.log(not_rated_films[i].new_rating)   
    };

    not_rated_films.sort(function (a,b) {
        return a.new_rating > b.new_rating;
    });

    result = not_rated_films.slice(0,5);

    return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
            body: ((result)),
        };
    }

