const mongoose = require ("mongoose") ;
const {Schema , model } = require ("mongoose") ;


const TransactionSchema = new Schema(
    {
        name : {
            type : String ,
            required : true ,
        },
        desc : {
            type : String ,
        },
        date : {
            type : Date ,
            required : true ,
        } 
    }
);

const TransactionModel = model( 'Transaction' , TransactionSchema ) ;

module.exports = TransactionModel ;