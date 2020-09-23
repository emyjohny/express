const express = require('express');
const dataService = require('./services/data.services')
const session = require('express-session')
const app = express();
app.use(session({
    secret:'randomsecurestring',
    resave:false,
    saveUninitialized:false
}))
app.use(express.json());
const logMiddleware =(req,res,next)=>{
    console.log(req.body);
    next();
};
app.use(logMiddleware);
const authMiddleware =(req,res,next)=>{
    if(!req.session.currentUser){
        return res.status(401).json({
          status:false,
          statuscode:401,
          message:"Please Login"

        });
      }
      else{
          next();
      }
}
app.get('/',(req,res)=>{
    res.send("Helloo world");
})

app.post('/',(req,res)=>{
    res.send("post method");
})
app.post('/register',(req,res)=>{
    const result=dataService.register(req.body.name,req.body.acno,req.body.pin,req.body.password);
res.status(result.statuscode).json(result);
})
app.post('/login',(req,res)=>{
    const result=dataService.login(req,req.body.acno,req.body.password)
    res.status(result.statuscode).json(result)
})

app.post('/deposit',authMiddleware,(req,res)=>{
    console.log(req.session.currentUser)
    const result=dataService.deposit(req.body.acno,req.body.pin,req.body.amount)
    res.status(result.statuscode).json(result)
})
app.get('/transactions',authMiddleware,(req,res)=>{
    const result =dataService.getTransactions(req);
    res.status(200).json(result);
})
app.delete('/transactions/:id',(req,res)=>{
   const result=dataService. deleteTransactions(req,req.params.id)
   res.status(200).json(result);
})
app.post('/withdraw',authMiddleware,(req,res)=>{
    const result=dataService.withdraw(req.body.acno,req.body.pin,req.body.amount)
    res.status(result.statuscode).json(result)
})
app.put('/',(req,res)=>{
    res.send("put method");
})
app.patch('/',(req,res)=>{
    res.send("patch method");
})
app.delete('/',(req,res)=>{
    res.send("delete");
})
app.listen(3000,()=>{
    console.log("server started at port 3000")
})
