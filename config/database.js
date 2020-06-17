const logSymbols = require('log-symbols');
const mongoose = require('mongoose');

const initDatabase = () => {

  // options for connection uri string
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }

  // connecting to db
  mongoose.connect('mongodb+srv://amir:Pass@123@blog-ej60m.mongodb.net/blogs?retryWrites=true&w=majority', options);

  //access connection object
  const connection = mongoose.connection;

  // Event listeners for connection objects
  connection.on('connected', () => {
    console.log("Connected to database successfully",logSymbols.success);
  });

  connection.on('error', (err) => {
    console.log(err);
  });

  connection.on('disconnected', () => {
    console.log("Disconnected")
  });

}


module.exports = initDatabase;