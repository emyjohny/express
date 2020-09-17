const express = require('express');
const dataService = require('./services/data.services')
const app = express();
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Helloo");
})

app.post('/',(req,res)=>{
    res.send("post method");
})
app.post('/register',(req,res)=>{
    const result=dataService.register(req.body.name,req.body.acno,req.body.pin,req.body.password);
res.status(result.statuscode).json(result);
})
app.post('/login',(req,res)=>{
    const result=dataService.login(req.body.acno1,req.body.password)
    res.status(result.statuscode).json(result)
})
app.post('/deposit',(req,res)=>{
    const result=dataService.deposit(req.body.acno,req.body.pin,req.body.amount)
    res.status(result.statuscode).json(result)
})
app.get('/transactions',(req,res)=>{
    const result =dataService.getTransactions();
    res.status(200).json(result);
})
app.post('/withdraw',(req,res)=>{
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
