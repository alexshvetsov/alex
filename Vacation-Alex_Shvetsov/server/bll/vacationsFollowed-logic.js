const dal = require("../dal/dal");

async function getAllVacationsFollowed() {
    const sql = `SELECT
    vacationID,
    userID
    FROM vacationsFollowed`;
    const reviews = await dal.execute(sql);
    return reviews;
}

async function getOneVacationsFollowed(id) {
    const sql = `SELECT
    vacationID,
    userID
    FROM vacationsFollowed
    where userID =${id}`;
    const reviews = await dal.execute(sql);
    return reviews;
}

async function addVacationsFollowed(vacationsFollowed) {
    const sql = `INSERT INTO
    vacationsFollowed(vacationID, userID)
    VALUES(${vacationsFollowed.vacationID},'${vacationsFollowed.userID}')`;
    const info = await dal.execute(sql);
    vacationsFollowed.id = info.insertId;
    return vacationsFollowed;
}

async function deleteVacationsFollowed(vacationID,userID) {
    const sql = "delete from vacationsFollowed where vacationID = " + vacationID + " and userID ="+ userID;
    await dal.execute(sql);
}
async function deleteVacationsFollowedByVacationID(vacationID) {   
    const sql = "delete from vacationsFollowed where vacationID = " + vacationID ;
    await dal.execute(sql);
}


module.exports = {
    getAllVacationsFollowed,
    addVacationsFollowed,
    getOneVacationsFollowed,
    deleteVacationsFollowed,
    deleteVacationsFollowedByVacationID
    
};