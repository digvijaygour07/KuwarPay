// myFunction.js
const handler = async (event, context) => {
  try {
    const { name } = event.queryStringParameters;
    const response = {
      message: `Hello, ${name || 'World'}!`,
      data: {
        timestamp: new Date().toISOString(),
        url: event.rawUrl,
      },
    };
    return {
      statusCode: 200,
      body: JSON.stringify(response),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

export { handler };