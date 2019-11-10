const express = require("express");
const reportLogic = require("../bll/report-logic");

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const follows = await reportLogic.getFollowsReport();
        console.log(follows)
        response.json(follows);
    } catch (error) {
        response.status(500).json(error.message);
    }
})


module.exports = router;