const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bank_server',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
const User = mongoose.model('User',{
    name:String,
    acno:Number,
    pin:Number,
    password:String,
    balance:Number,
    transactions:[{
        amount:Number,
        typeOfTransaction:String
    }]
});
module.exports ={
User
}