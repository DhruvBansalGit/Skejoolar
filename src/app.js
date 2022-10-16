const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const path = require('path');
const Register = require('./models/registers');
const port = process.env.PORT || 3000
require("./db/conn");
// mongoose.connect("mongodb://localhost:27017/SocietyDB",{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
// }).then(()=>{
//     console.log("connection Succesfull...")
// }).catch((e)=>{
//     console.log("no connection");
// })

const static_path = path.join(__dirname, "../public");

app.use(express.static(static_path));
app.use(express.urlencoded({
    extended: true
  }));
  //contact
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    text: String
  });

var contact = mongoose.model('Contact', contactSchema);
app.post('/contact',(req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This information is stored in Database");
    }).catch(()=>{
        res.status(400).send("This information is not stored");
    });
})
//contact

app.set('view engine','hbs');
app.set('views',path.join(__dirname,'views'))

app.get("/",(req,res)=>{
    res.render("index.hbs")
})
app.get("/register",(req,res)=>{
    res.render("register.hbs")
})
app.get("/admin",(req,res)=>{
    res.render("admin.hbs")
})
app.get("/admin1",(req,res)=>{
    res.render("admin1.hbs")
})
//login
app.get("/login",(req,res)=>{
    res.render("register.hbs")
})
//tasks
app.get("/assign-define",(req,res)=>{
    res.render("define.hbs");
})
app.get("/assign-bajrang",(req,res)=>{
    res.render("bajrang.hbs");
})
app.get("/assign-enter",(req,res)=>{
    res.render("enter.hbs");
})
app.get("/assign-elec",(req,res)=>{
    res.render("elec.hbs");
})
app.get("/assign-avanesh",(req,res)=>{
    res.render("tasks.hbs");
})
app.get("/assign-bajrang",(req,res)=>{
    res.render("tasks.hbs");
})
app.get("/assign-enter",(req,res)=>{
    res.render("tasks.hbs");
})
app.get("/assign-elec",(req,res)=>{
    res.render("tasks.hbs");
})
//calender
app.get("/calendar",(req,res)=>{
    res.render("calendar.hbs");
})
//donate
app.get("/donate",(req,res)=>{
    res.render("donate.hbs");
})
//Student
app.get("/student",(req,res)=>{
    res.render("student.hbs");
})
app.get("/societies",(req,res)=>{
    res.render("societies.hbs");
})
app.get("/calendar2",(req,res)=>{
    res.render("calendar2.hbs");
})



app.post("/login",async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Register.findOne({email:email});
        if(useremail.password === password){
            res.status(201).render("admin");
        }
        else{
            res.send("Login details are not valid")
        }
    } catch(error){
        res.status(400).send("Login details are not valid")
    }
})

app.post("/register",async (req,res)=>{
    try{
        
        const password = req.body.password;
        if(password.length>=6){
            const registerusers = new Register({
                username :req.body.username,
                email : req.body.email,
                password: password
            })

            const registered = await registerusers.save();
            res.status(201).render("index");
        }else{
            res.send("Size is below 6 letters")
        }

    } catch(error){
        res.status(400).send(error);
    }
})



app.listen(port,()=>{
    console.log(`The application started successfully at port ${port}`);
})