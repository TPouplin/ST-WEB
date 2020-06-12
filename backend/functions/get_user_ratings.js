const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    const dynamoDb = new DynamoDB.DocumentClient();  
    const result = await dynamoDb.scan({
            TableName: process.env.tableName,
            ProjectionExpression: "film_id, score",
            FilterExpression: "#na = :user_id",
            ExpressionAttributeNames: {
                "#na":"user_id",
            },
            ExpressionAttributeValues: {
                ":user_id": event.user_id,
            },
        }).promise();

    if (result.Count) {
        var result2 = {};
        for (var i = 0; i < Object.values(result.Items).length; i++){
            const key = result.Items[i].film_id
            result2[key] = result.Items[i].score
        };
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
            body: (result2),
        }
    } else {
        return {
            statusCode: 404,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
            body: "pas de note trouvé",
        }
    }
}

