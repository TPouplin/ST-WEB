const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    const dynamoDb = new DynamoDB.DocumentClient();
    const result = await dynamoDb.scan({
        TableName: process.env.tableName,

    }).promise();

    return {
        statusCode: 200,
        body: (result.Items),
    }
}

