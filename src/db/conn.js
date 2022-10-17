const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/SocietyDB" || process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("connection Succesfull...")
}).catch((e)=>{
    console.log("no connection");
})