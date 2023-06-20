const express=require('express');
const path=require('path');
const app=express();
app.use(express.urlencoded());
const port=80;

app.use(express.static(path.join(__dirname)))
app.get('/',(req,res)=>{
    res.redirect('index.html')
})

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'login.html'));
})
app.post('/login',(req,res)=>{
    const email=req.body.email;
    req.email=email;
    console.log(email);
    res.redirect('index.html');
})



app.listen(port,()=>{
    console.log("server is running");
})

