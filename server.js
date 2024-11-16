const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });

mongoose.connect(process.env.DATABASE)
        .then(()=>console.log("connected to DB"))

app.listen(8000,()=>{
    console.log("server is listening on port 8000")
})
