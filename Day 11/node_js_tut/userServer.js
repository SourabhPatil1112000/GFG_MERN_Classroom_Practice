const express = require("express");
const app = express();

app.use(express.json());

let users = [];

// Add User (POST)
app.post("/addUser", (req,res) => {
    users.push(req.body);
    res.json({
        message: "User has been added successfully Sourabh...!!",
        data: users
    });
});

// Get all users (GET)
app.get("/users", (req,res) => {
    res.json(users);
});

// Start Server
app.listen(3002, () => {
    console.log("Server running on port no. 3002");
})

// Update any user with id (PUT)
app.put("/updateUser/:id", (req,res) => {
    let id = parseInt(req.params.id);

    let user = users.find(u => u.id === id);

    if(!user){
        return res.status(404).send("User not found for this id");
    }

    if(req.body.name){
        user.name = req.body.name;
    }

    if(req.body.age){
        user.age = req.body.age;
    }

    res.json({
        message: "User Updated",
        data: user
    });
});

// Remove user (DELETE)
app.delete("/deleteUser/:id", (req, res) => {
    let id = parseInt(req.params.id);

    let index = users.findIndex(u => u.id === id);

    if(index === -1){
        return res.status(404).send("User not found");
    }

    users.splice(index, 1);

    res.json({
        message: "User deleted",
        data: users
    });
});