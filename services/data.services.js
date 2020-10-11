const db = require('./db')
let accountDetails = {
  1001: { name: "user1", acno: 1001, pin: 4387, password: "userone", balance: 3000, transactions: [] },
  1002: { name: "user2", acno: 1002, pin: 1234, password: "usertwo", balance: 3000, transactions: [] },
  1003: { name: "user3", acno: 1003, pin: 1235, password: "userthree", balance: 3000, transactions: [] },
  1004: { name: "user4", acno: 1004, pin: 1236, password: "userfour", balance: 3000, transactions: [] },
  1005: { name: "user5", acno: 1005, pin: 1237, password: "userfive", balance: 3000, transactions: [] },
}
let currentUser;
const register = (name, acno, pin, password) => {
  return db.User.findOne({
    acno: acno
  })
    .then(user => {
      // console.log(user);
      if (user) {
        return {
          status: false,
          statuscode: 422,
          message: "Account already exists "
        }
      }
      const newUser = new db.User({
        name,
        acno,
        pin,
        password,
        balance: 0,
        transactions: []
      });
      newUser.save();
      return {
        status: true,
        statuscode: 200,
        message: "Account created successfully"
      }
    })
}

const login = (req, acno, password) => {
  var acno = parseInt(acno);
  return db.User.findOne({
    acno: acno,
    password
  })
    .then(user => {
      if (user) {
        req.session.currentUser =acno;
        return {
          status: true,
          statuscode: 200,
          message: "Login successful ",
          name:user.name
        }
      }
      return {
        status: false,
        statuscode: 422,
        message: "invalid credentials "
      }
    })

}
const deposit = (accnum, pin1, amount1) => {
  var pinnum = parseInt(pin1)
  var amount = Number(amount1)
  return db.User.findOne({
    acno: accnum,
    pin: pinnum,
      })
    .then(user => {
      if (!user) {
        return {
          status: false,
          statuscode: 422,
          message: "invalid cred",
        }
      }
      user.balance += amount;
      user.transactions.push({
        amount: amount,
        typeOfTransaction: "credit"
        
      });
      user.save();
      //  this.saveDetails();
      return {
        status: true,
        message: "amount credited",
        statuscode: 200,
        balance: user.balance
      }

    }
    )
 

}
const withdraw = (accnum, pin1, amount1) => {
  var pinnum = parseInt(pin1);
  var amount = Number(amount1);
  return db.User.findOne({
    acno: accnum,
    pin: pinnum,

  })
    .then(user => {
      if (!user) {
        return {

          status: false,
          statuscode: 422,
          message: "invalid cred"

        }
      }
      if(req.session.currentUser!=accnum){
        return{
        status: false,
          statuscode: 422,
          message: "you are not allowed to do this transaction"
        }
      }
      if (user.balance < amount) {
        return {
          status: false,
          statuscode: 422,
          message: "insufficient balance",
          balance: user.balance
        }
      }
      user.balance -= amount;
      user.transactions.push({
        amount: amount,
        typeOfTransaction: "Debit"
        
      })
      user.save();
      return {
        status: true,
        statuscode: 200,
        message: "account has been debited",
        balance: user.balance
     } })
    }

    

  const getTransactions = (req) => {
    return db.User.findOne({
      acno:req.session.currentUser
    })
    .then(user=>{
          return{
          status:true,
          statuscode:200,
          transactions:user.transactions
        }
      

    })

  }
  const deleteTransactions = (req, id) => {
    
    return db.User.findOne({
      acno:req.session.currentUser
    })
    .then(user=>{
      
        user.transactions = user.transactions.filter(t => {
          if (t._id == id) {
            return false;
          }
          return true;
        })
        user.save();
     
        return {
          status: true,
          statuscode: 200,
          message: "Transaction deleted successfully"
        }
    })
    

    }
    
  


  module.exports = {
    register,
    login,
    deposit,
    withdraw,
    getTransactions,
    deleteTransactions
  }
