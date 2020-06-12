const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    const dynamoDb = new DynamoDB.DocumentClient();  
    let result

    if (event.critere === "caracteristique") {
        result = await dynamoDb.scan({
            TableName: process.env.tableName,
            ProjectionExpression: "#na, #id, #da,tag ",
            FilterExpression: "contains(#att, :att_v)",
            ExpressionAttributeNames: {
                "#id": "uuid",
                "#na":"name",
                "#da":"data",
                "#att": "tag",
            },
            ExpressionAttributeValues: {
                ":att_v": event.valeur,
                
            },
        }).promise();

    } else {
        result = await dynamoDb.scan({
            TableName: process.env.tableName,
            ProjectionExpression: "#na, #id, #da,tag ",
            FilterExpression: "#att = :att_v",
            ExpressionAttributeNames: {
                "#id": "uuid",
                "#na":"name",
                "#da":"data",
                "#att": event.critere,
            },
            ExpressionAttributeValues: {
                ":att_v": event.valeur,
            },
        }).promise();
    }

    if (result.Count) {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
            body: (result),
        }
    } else {
        return {
            statusCode: 403,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
            body: "pas de film trouvé",
        }
    }
}

