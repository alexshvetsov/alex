const dal = require("../dal/dal");

async function getFollowsReport(){
    const sql=`SELECT COUNT(vacationsfollowed.userID) as follows, vacations.destination as name FROM vacationsfollowed ,
       vacations  WHERE vacations.vacationID = vacationsfollowed.vacationID GROUP BY vacations.vacationID`
       return await dal.execute(sql);
  }
  
  module.exports={getFollowsReport}