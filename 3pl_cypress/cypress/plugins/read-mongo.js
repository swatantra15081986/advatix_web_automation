const MongoClient = require('mongodb').MongoClient;

 
const mongodb_connection = async  ({url, collection_name,mobile_number}) => {
    const mongoDB =  await MongoClient.connect(url, {
        useUnifiedTopology: true})
        const db = mongoDB.db()
        const query = await db.collection(collection_name).findOne({phone:mobile_number});
        console.log(query)
        return query

}

module.exports = {
    mongodb_connection,
}