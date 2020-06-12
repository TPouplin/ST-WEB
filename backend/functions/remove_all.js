const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    const dynamoDb = new DynamoDB.DocumentClient();
    const result = await dynamoDb.query({
        TableName: process.env.tableName,
        KeyConditionExpression: '#type = :type',
        ExpressionAttributeNames: {
            '#type': 'type'
        },
        ExpressionAttributeValues: {
            ':type': event,
        },
    }).promise();

    
    for (var i = 0; i < Object.values(result.Items).length; i++){
        console.log(i);
        console.log(result.Items[i]);
        const dynamoDb2 = new DynamoDB.DocumentClient();
        const result2 = await dynamoDb.delete({
            TableName: process.env.tableName,
            Key: {
                type: result.Items[i].type,
                uuid: result.Items[i].uuid,
            },
        }).promise();
    };
    return {
        statusCode: 200,
        body: "C'est supprimé !",
    }
}