let accountDetails={
    1001:{name:"user1",acno:1001,pin:4387,password:"userone",balance:3000,transactions:[]},
    1002:{name:"user2",acno:1002,pin:1234,password:"usertwo",balance:3000,transactions:[]},
    1003:{name:"user3",acno:1003,pin:1235,password:"userthree",balance:3000,transactions:[]},
    1004:{name:"user4",acno:1004,pin:1236,password:"userfour",balance:3000,transactions:[]},
    1005:{name:"user5",acno:1005,pin:1237,password:"userfive",balance:3000,transactions:[]},
}
let currentuser;
const register=(name,acno,pin,password)=>{
    if(acno in accountDetails){
        return {
          status:false,
          statuscode:422,
          message:"Account already exists "
          }
    }
accountDetails[acno]={
  name,
  acno,
  pin,
  password,
  balance:0,
  transactions:[]
}

return {
    status:true,
    statuscode:200,
    message:"Account created successfully"
    }
  }
  const login=(acno1,password)=>{
    var acno=parseInt(acno1);
    var data=accountDetails;
    if(acno in data){
      var pwd =data[acno].password
      if(pwd==password){
        currentUser=data[acno];
        // this.saveDetails();
        return {
          status:true,
          statuscode:200,
          message:"Login successful "
          }
      }
    }
    return {
      status:false,
      statuscode:422,
      message:"invalid credentials "
      }}
      const deposit =(accnum,pin1,amount1)=>{
        var pinnum=parseInt(pin1)
        var amount=Number(amount1)
        var data=accountDetails;
        if(accnum in data){
          let mpin=data[accnum].pin;
          if(mpin==pinnum){
             data[accnum].balance+=amount;
             data[accnum].transactions.push({
              amount:amount,
              type:"credit"
             })
            //  this.saveDetails();
             return {
               status:true,
               message:"amount credited",
               statuscode:200,
               balance: data[accnum].balance
             }
             
          }
          else{
            return{
              status:false,
              statuscode:422,
              message:"invalid cred",
            }
            
          }
      }
    
      }
     const withdraw=(accnum,pin1,amount1)=>{
        var pinnum=parseInt(pin1);
        var amount=Number(amount1); 
        var data=accountDetails;
        if(accnum in data){
          let mpin=data[accnum].pin;
          if(amount>data[accnum].balance){
            return{
              status:false,
              message:"insufficient balance",
              balance:data[accnum].balance
            }
          }
          else if(mpin==pinnum){
            
             data[accnum].balance-=amount;
             data[accnum].transactions.push({
               amount:amount,
               type:"Debit"
             })
            //  this.saveDetails();
             return{
              status:true,
              statuscode:200,
              message:"account has been debited",
              balance:data[accnum].balance
            }
            }
            else{
              return{
                status:false,
                statuscode:422,
                message:"invalid cred"
              }
            }
          }
      }
     const getTransactions=()=>{
        return accountDetails[currentUser.acno].transactions;
          
          }
          
            
  module.exports={
      register,
      login,
      deposit,
      withdraw,
      getTransactions
  }
