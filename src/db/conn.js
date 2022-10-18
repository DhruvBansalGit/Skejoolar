const mongoose = require('mongoose');
const DB = "mongodb+srv://dhruv:dhruv@cluster0.nmyvfvo.mongodb.net/SocietyDB?retryWrites=true&w=majority";
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("connection Succesfull...")
}).catch((e)=>{
    console.log("no connection");
})