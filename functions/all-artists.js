const { GraphQLClient, gql } = require('graphql-request');


exports.handler = async (event, context) => {
  const endpoint = 'https://graphql.fauna.com/graphql';
  const authorization = `Bearer ${process.env.FAUNADB_SERVER_SECRET}`;

  const graphQLClient = new GraphQLClient(endpoint, { 
    headers: { authorization },
  });

  const query = gql`
    {
      allArtists {
        data {
          _id
          name
        }
      }
    }
  `;
  
  let response;

  try {
    const data = await graphQLClient.request(query);

    response = {
      statusCode: 200,
      body: JSON.stringify(data);
    };
  } catch (error) {
    response = {
      statusCode: 400,
      body: JSON.stringify(error)
    };
  }
  
  return response;
};
