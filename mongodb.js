const dbName = "hackathon";
const {uri} = require('./key');

const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function uploadData(collectionName,data){
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertMany(data);
        return result;
    } 
    catch (error) {
        console.error('Error inserting data to the database:', error);
        return null;
    } 
    finally {
        client.close();
    }
}

exports.retrieveIdConnections = async function retrieveIdConnections(id) {
    try {
      await client.connect();
      console.log('Connected to MongoDB Atlas');
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      const documents = await collection.find({"from":id}).toArray();
      return documents;
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }

exports.uploadConnectionData = async function uploadConnectionData(data){
    return await uploadData("connections",data);
}

exports.uploadServicesData = async function uploadServicesData(data){
    return await uploadData("services",data);
}
