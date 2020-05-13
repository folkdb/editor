/* Import faunaDB sdk */
const faunadb = require('faunadb')
const q = faunadb.query


exports.handler = (event, context) => {
  console.log('Function `all-artists` invoked')
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })
  return client.query(q.Paginate(q.Match(q.Ref('indexes/allArtists'))))
    .then((response) => {
      const artistRefs = response.data
      console.log('Artist refs', artistRefs)
      console.log(`${artistRefs.length} artists found`)
      // create new query out of todo refs. http://bit.ly/2LG3MLg
      const getAllArtistsDataQuery = artistRefs.map((ref) => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getAllArtistsDataQuery).then((ret) => {
        return {
          statusCode: 200,
          body: JSON.stringify(ret)
        }
      })
    }).catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}