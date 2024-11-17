const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });

mongoose.connect(process.env.DATABASE)
        .then(()=>console.log("connected to DB"))

const PORT  = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log("server is listening on port 8000")
})
