const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    const dynamoDb = new DynamoDB.DocumentClient();
    const result = await dynamoDb.delete({
        TableName: process.env.tableName,
        Key: {
            type: event.type,
            uuid: event.id,
        },
    }).promise();

    return {
        statusCode: 200,
        body: "C'est supprimé !",
    }
}