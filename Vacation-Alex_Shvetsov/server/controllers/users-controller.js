const express = require("express");
const usersLogic = require("../bll/users-logic");

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const users = await usersLogic.getAllUsers();
        response.json(users);
    }
    catch (err) {
        response.status(500).json(err.message);
    }
});

router.post("/login", async (request, response) => {
    try {
        const username = {...request.body};
        const user = await usersLogic.getOneUser(username.username);
        let responseBody;
        if(user.length>0){
            if(user[0].password===username.password){
                responseBody = user[0];
                responseBody.password=''
            }else{
                responseBody= 'User or Password is incorrect'
            }
        }else{
            responseBody= 'User or Password is incorrect'
        }
        response.json(responseBody);
    }
    catch (err) {
        response.status(500).json(err.message);
    }
});


router.post("/",async (request,response)=>{
    try{
        const user = request.body;
        const addedUser = await usersLogic.addUser(user)
        response.status(201).json(addedUser)
    }
    catch(err){
        response.status(500).json(err.message)
    }
})

module.exports = router;