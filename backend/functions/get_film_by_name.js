const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    const dynamoDb = new DynamoDB.DocumentClient();

    const result = await dynamoDb.scan({
        TableName: process.env.tableName,
        ProjectionExpression: "#na, #id, #da,tag ",
        FilterExpression: "#na = :qna",
        ExpressionAttributeNames: {
            "#id": "uuid",
            "#na":"name",
            "#da":"data",
        },
        ExpressionAttributeValues: {
            ":qna": event.pathParameters.id
        },
    }).promise();

    if (result.Count) {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
            body: JSON.stringify(result),
        }
    } else {
        return {
            statusCode: 404,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
            body: "pas de film trouvé",
        }
    }
}
