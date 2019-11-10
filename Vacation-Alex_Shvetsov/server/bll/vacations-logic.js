const dal = require("../dal/dal");

async function getAllVacations() {
    const sql = `select vacationID as id, description,destination
    ,image, beginning, ending, price from vacations`
    
    const vacations = await dal.execute(sql)

    return vacations
};

async function getOneVacation(id) {

    const sql =`select vacationID as id, description,destination
    ,image ,beginning, ending, price from vacations where vacationID =${id}`
    const vacation = await dal.execute(sql)
    return vacation[0]

}

async function addVacation(vacation) {
    const sql = `insert into vacations(description, destination, image, beginning, ending, price)
    values('${vacation.description}', '${vacation.destination}', 
    '${vacation.image}', '${vacation.beginning}', '${vacation.ending}', '${vacation.price}')`;

    const info = await dal.execute(sql);
    vacation.id = info.insertId;
    return vacation;
}

async function updateVacation(vacation) {
    const sql = `update vacations set description= '${vacation.description}'
    ,destination= '${vacation.destination}',image= '${vacation.image}',beginning= '${vacation.beginning}',
    ending= '${vacation.ending}',price= '${vacation.price}'
    where vacationID =${vacation.id} `;
    await dal.execute(sql);
    return vacation;
}

async function updatePartialVacation(vacation) {
    const sql = `update vacations set description= '${vacation.description}'
    ,destination= '${vacation.destination}',image= '${vacation.image}',beginning= '${vacation.beginning}',
    ending= '${vacation.ending}',price= '${vacation.price}'
    where vacationID =${vacation.id} `;
    await dal.execute(sql);
    return vacation;

}

async function deleteVacation(id) {
    const sql = "DELETE FROM vacations WHERE vacationID = "+id;
    await dal.execute(sql);
}



module.exports = {
    getAllVacations,
    getOneVacation,
    addVacation,
    updateVacation,
    updatePartialVacation,
    deleteVacation

};
