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
    acno:acno
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
    })}

//     if(acno in accountDetails){
//         return {
//           status:false,
//           statuscode:422,
//           message:"Account already exists "
//           }
//     }
// accountDetails[acno]={
//   name,
//   acno,
//   pin,
//   password,
//   balance:0,
//   transactions:[]
// }

// return {
//     status:true,
//     statuscode:200,
//     message:"Account created successfully"
//     }
  
  const login=(req, acno, password)=>{
    var acno = parseInt(acno);
    return db.User.findOne({
      acno:acno,
      password
    })
    .then(user=>{
      if(user){
        req.session.currentUser=user;
        return{
          status: true,
              statuscode: 200,
              message: "Login successful "
        }
      }
      return{
        status: false,
          statuscode: 422,
          message: "invalid credentials "
      }
    })
        // var acno = parseInt(acno);
        // var data = accountDetails;
        // if (acno in data) {
        //   var pwd = data[acno].password;
        //   if (pwd == password) {
        //     req.session.currentUser = data[acno];
        //     // this.saveDetails();
        //     return {
        //       status: true,
        //       statuscode: 200,
        //       message: "Login successful "
        //     };
        //   }
        // }
        // return {
        //   status: false,
        //   statuscode: 422,
        //   message: "invalid credentials "
        // };
      }
  const deposit = (accnum, pin1, amount1) => {

    var pinnum = parseInt(pin1)
    var amount = Number(amount1)
    var data = accountDetails;
    if (accnum in data) {
      let mpin = data[accnum].pin;
      if (mpin == pinnum) {
        data[accnum].balance += amount;
        data[accnum].transactions.push({
          amount: amount,
          type: "credit",
          id: Math.floor(Math.random() * 10000)
        })
        //  this.saveDetails();
        return {
          status: true,
          message: "amount credited",
          statuscode: 200,
          balance: data[accnum].balance
        }

      }
      else {
        return {
          status: false,
          statuscode: 422,
          message: "invalid cred",
        }

      }
    }

  }
  const withdraw = (accnum, pin1, amount1) => {
    var pinnum = parseInt(pin1);
    var amount = Number(amount1);
    var data = accountDetails;
    if (accnum in data) {
      let mpin = data[accnum].pin;
      if (amount > data[accnum].balance) {
        return {
          status: false,
          statuscode: 422,
          message: "insufficient balance",
          balance: data[accnum].balance
        }
      }
      else if (mpin == pinnum) {

        data[accnum].balance -= amount;
        data[accnum].transactions.push({
          amount: amount,
          type: "Debit",
          id: Math.floor(Math.random() * 10000)
        })
        //  this.saveDetails();
        return {
          status: true,
          statuscode: 200,
          message: "account has been debited",
          balance: data[accnum].balance
        }
      }
      else {
        return {
          status: false,
          statuscode: 422,
          message: "invalid cred"
        }
      }
    }
  }
  const getTransactions = (req) => {
    return accountDetails[req.session.currentUser.acno].transactions;

  }
  const deleteTransactions = (req, id) => {
    let transactions = accountDetails[req.session.currentUser.acno].transactions
    transactions = transactions.filter(t => {
      if (t.id == id) {
        return false;
      }
      return true;
    })
    accountDetails[req.session.currentUser.acno].transactions = transactions;
    return {
      status: true,
      statuscode: 200,
      message: "Transaction deleted successfully"
    }
  }


  module.exports = {
    register,
    login,
    deposit,
    withdraw,
    getTransactions,
    deleteTransactions
  }
