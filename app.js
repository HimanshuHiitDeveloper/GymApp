const express = require('express')
require('dotenv').config();
const app = express()
const path = require('path')
const port = process.env.PORT || 5000;

// app.use(express.json())
app.use(express.urlencoded({extended:false}))

const {mongoConnect} = require('./connections/connection')
const user = require('./models/schemas')


// connect to mongoDB 
mongoConnect()


app.get('/',(req,res)=>{
    const filePath = path.join(__dirname, '/public/index.html');
    res.sendFile(filePath);
})


app.get('/user/api', async (req,res)=>{
     const data = await user.find({})
     res.json({data})
})

app.get('/api/username/:name', async (req,res)=>{
    const userName = req.params.name;
    const fdata = await user.filter((data)=> data.first_name === userName)
    res.json({fdata})
  })

app.post('/adduser', async(req,res)=>{
    const body = req.body;
    const addUser = await user.create({
        fullName : body.fullName,
        email : body.email,
        age: body.age,
        mesg: body.mesg,
        phnumber: body.phnumber,
        Join: body.Join,
        payment:  body.payment,

    })
    res.redirect('/');
   })

   app.post('/delete/:id', async (req,res)=>{
      const userid = req.params.id;
      console.log(userid)
      await user.findByIdAndDelete(userid)
     return  res.redirect('/');
   })

   app.post('/updateUser/:id', async (req, res) => {
    const body = req.body;
    const userid = req.params.id;
    
    try {
      // Update user data in the MongoDB database
      // userid,  { payment: body.paymeny }
      const use = await user.findByIdAndUpdate({_id:userid}, {$set:{
        payment
        :body.payment} });
    
  
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating user.');
    }
  });



app.listen(port,()=>{
    console.log(`Your server listning localhost:${port}`);
})    