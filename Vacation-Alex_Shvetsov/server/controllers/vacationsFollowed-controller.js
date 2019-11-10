const express = require("express");
const vacationsFollowedLogic = require("../bll/vacationsFollowed-logic");

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const vacationsFollowed = await vacationsFollowedLogic.getAllVacationsFollowed();
        response.json(vacationsFollowed);
    }
    catch (err) {
        response.status(500).json(err.message);
    }
});

router.get("/:id",async (request,response)=>{
    try{
        const id=+request.params.id
        const vacationsFollowed = await vacationsFollowedLogic.getOneVacationsFollowed(id);
        response.json(vacationsFollowed)
    }
catch(err){
    response.status(500).json(err.message)
}    
});

router.post("/",async (request,response)=>{
    try{
        const vacationsFollowed = request.body;
        const addedvacationsFollowed = await vacationsFollowedLogic.addVacationsFollowed(vacationsFollowed)
        response.status(201).json(addedvacationsFollowed)
    }
    catch(err){
        response.status(500).json(err.message)
    }   
})

router.delete("/:vacationID/:userID", async (request, response) => {
    const vacationID = +request.params.vacationID;
    const userID = +request.params.userID;
    await vacationsFollowedLogic.deleteVacationsFollowed(vacationID,userID);
    response.sendStatus(204);
});
router.delete("/:vacationID", async (request, response) => {
    const vacationID = +request.params.vacationID;
    await vacationsFollowedLogic.deleteVacationsFollowedByVacationID(vacationID);
    response.sendStatus(204);
});




module.exports = router;