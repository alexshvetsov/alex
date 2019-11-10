const express = require('express');
const vacationsLogic = require("../bll/vacations-logic");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "..\\client\\public\\assets\\images" });

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const vacations = await vacationsLogic.getAllVacations();
        response.json(vacations)
    } catch (err) {
        response.status(500).json(err.message)
    }
})

router.get("/:id", async (request, response) => {
    try {
        const id = +request.params.id
        const vacations = await vacationsLogic.getOneVacation(id);
        response.json(vacations)
    }
    catch (err) {
        response.status(500).json(err.message)
    }
});

router.post("/", upload.single("vacationImage"), async (request, response) => {
    try {
        const vacation = JSON.parse(request.body.vacation);
        if (request.file) {
            const fileExtension = path.extname(request.file.originalname);
            const multerFilename = request.file.destination + "\\" + request.file.filename;
            const finalFileName = multerFilename + fileExtension;
            const imgNewFullName = multerFilename.split("\\").pop() + fileExtension;
            vacation.image = imgNewFullName;
            fs.rename(multerFilename, finalFileName, async err => {
                if (err) {
                    response.status(500).json(err);
                    return;
                }
            });
        }
        if (vacation.id == 0) {
            const addedVacation = await vacationsLogic.addVacation(vacation);
            response.json(addedVacation);
        } else {
            if (request.file) {
                let updatedVacation = await vacationsLogic.updateVacation(vacation)
                response.json(updatedVacation)
            } else {
                updatedVacation = await vacationsLogic.updateVacation(vacation)
                response.json(updatedVacation);
            }
        }
    } catch (error) {
        response.status(500).json(error.message);
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const id = +request.params.id;
        const vacation = await vacationsLogic.getOneVacation(id);
        fs.unlink(`..\\client\\public\\assets\\images\\${vacation.image}`, async err => {
            if (err) {
                return;
            }
            await vacationsLogic.deleteVacation(id);
            response.sendStatus(204)
        });
    }
    catch (err) {
        response.status(500).json(err.message)
    }
})


module.exports = router 