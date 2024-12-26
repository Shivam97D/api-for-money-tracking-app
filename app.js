const express = require('express');
const app = express() ;
const path = require('path') ;
const cors = require( 'cors' )
const Transaction = require('./models/transaction.js');
const { default: mongoose } = require('mongoose');
require('dotenv').config();  // Load environment variables from .env file


app.use( cors() );
app.set( 'view engine' , 'ejs');
app.use( express.json() );
app.use( express.urlencoded( { extended : true }) );
app.use( express.static( path.join( __dirname , 'public')));

app.get('/' , ( req , res )=> {
     res.send('Welcome This is new project with new day  ...!!!!! <br> You are into the backend server for the money tracker app.  go to url/help for more info. Thanks.....!!!!!!');
});

app.get('/help' , ( req , res )=> {
     res.send('To add a new transaction of the money spend , POST url/transaction/add , { name , desc , date } . <br> To access transactions done till date , GET url/transactions/done , will return the transaction array. ');
});


app.post('/create' , ( req ,res )=>{
           console.log( 'The accepted req for creating task is : ' , req.body);
           res.redirect('/');
})


 /// this is the the adding request from user to add req obj 

app.post( '/transaction/add' , async ( req , res ) =>{
  console.log('The accepted req is : ' , req.body );
  const { name , desc , date } = req.body
  const MongoUri = process.env.MONGO_CONNECT_STRING ;
  await mongoose.connect( process.env.MONGO_CONNECT_STRING ) ;
  const transaction = await Transaction.create( { name , desc , date } ) ;


  res.json( transaction )
} )


app.get( '/transactions/done' , async ( req , res ) =>{
  await mongoose.connect( process.env.MONGO_CONNECT_STRING ) ;
  const transactions = await Transaction.find() ;
  res.json( transactions ) ;
} )




app.listen(3000);