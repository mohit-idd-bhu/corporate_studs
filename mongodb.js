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
      const collection = db.collection("connections");
      const documents = await collection.find({"from":id}).toArray();
      return documents;
    } catch (error) {
      console.error('Error connecting to the database:', error);
    } finally {
        client.close();
    }
  }

exports.uploadConnectionData = async function uploadConnectionData(data){
    return await uploadData("connections",data);
}

exports.uploadServicesData = async function uploadServicesData(data){
    return await uploadData("services",data);
}

exports.resetDatabase = async function resetDatabase(){
    try {
        await client.connect();
        console.log('Delted Database of MongoDB Atlas');
        const db = client.db(dbName);
        const collection1 = db.collection("connections");
        await collection1.deleteMany({});
        const collection2 = db.collection("services");
        await collection2.deleteMany({});
        return true;
      } catch (error) {
        console.error('Error connecting to the database:', error);
        return error;
      } finally {
          client.close();
      }
}

exports.getServicesData  = async function getServicesData(service){
    try{
        await client.connect();
        console.log("MongoDB Connected");
        const db=client.db(dbName);
        const collection=db.collection("services");
        const ruleData=await collection.find({"service":service}).toArray();
        return ruleData;
    }
    catch(err){
        console.log(err);
    }
    finally{
        client.close();
    }
}
