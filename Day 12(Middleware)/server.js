const express = require("express");
const app = express();

app.use(express.json());

let users = [];
let idcounter = 1;

app.post("/addUser",(req,res) => {
    let {name, age, phNum} = req.body;

    if(!name || name.length < 3){
        return res.status(400).send("name must be atleast 3 characters");
    }
    if(!age || age<=18){
        return res.status(400).send("Age must be 18+");
    }
    if(!phNum || phNum.toString().length < 10){
        return res.status(400).send("Phone Number should be minimum 10 digits");
    }

    let user = {
        id: idcounter++,
        name: req.body.name,
        age: req.body.age,
        phNum: req.body.phNum
    }
    users.push(user);
    res.json(user);
});

app.listen(3000, () => {
    console.log("server is running");
})