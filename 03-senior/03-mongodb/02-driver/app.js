/*
* @Author: TomChen
* @Date:   2019-03-27 18:13:28
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-27 18:32:47
*/
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'kuazhu';

// Create a new MongoClient
const client = new MongoClient(url,{ useNewUrlParser: true });

// Use connect method to connect to the Server
client.connect(function(err) {
	console.log("Connected successfully to server");

	const db = client.db(dbName);


	// Get the documents collection
  	const collection = db.collection('users');

  	//Insert a Document
  	/*
  	collection.insertMany([{name:"Amy",age:18,major:"Computer"},{name:"Leo",age:18,major:"Computer"}],(err,result)=>{
  		if(err){
  			console.log('insertMany err::',err)
  		}else{
  			console.log(result)
  		}
  		client.close();
  	});
  	*/
  
  	//Find all
  	/*
  	collection.find({}).toArray((err, docs)=>{
  		if(err){
  			console.log('find err::',err)
  		}else{
  			console.log(docs)
  		}
  		client.close();
  	});
  	*/
  	//Find Documents with a Query Filter
  	/*
  	collection.find({name:"Tom"}).toArray((err, docs)=>{
  		if(err){
  			console.log('find err::',err)
  		}else{
  			console.log(docs)
  		}
  		client.close();
  	});
  	*/
  	//Update a document
  	/*
  	collection.updateOne({name:"Tom"},{$set:{age:88}},(err,result)=>{
   		if(err){
  			console.log('updateOne err::',err)
  		}else{
  			console.log(result)
  		}
  		client.close(); 		
  	});
  	*/
  	//Remove a document
  	collection.deleteOne({name:"Tom"},(err,result)=>{
   		if(err){
  			console.log('deleteOne err::',err)
  		}else{
  			console.log(result)
  		}
  		client.close(); 	  		
  	});













});