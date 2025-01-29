// const express=require('express');
// const app=express();
// const PORT=process.env.PORT || 3000;

// app.get('/ping',(req,res)=>{
//     res.send('Hello world');
// });

// app.listen(PORT,()=>{
//     console.log(`Server is running on port ${PORT}`);
// });


require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

const Mongo_url = process.env.Mongo_url;

mongoose.connect(Mongo_url)
.then(()=>{
    console.log('Connected to the database');
}).catch(err=>{
    console.log("Mongodb failed",err);
})


app.get('/ping', (req, res) => {

    const dbstatus=mongo.connection.readyState===1?'Connected':'Not Connected';
    res.json({ message: 'Hello World', dbstatus: dbstatus });

})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})