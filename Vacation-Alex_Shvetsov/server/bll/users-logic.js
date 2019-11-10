const dal = require("../dal/dal");

async function getAllUsers() {
    const sql = `SELECT
    userID as id,
    firstName,
    lastName,
    username,
    password,
    isAdmin
    FROM users`;
    const users = await dal.execute(sql);
    return users;
}

async function getOneUser(username) {
    const sql = `SELECT
    userID as id,
    firstName,
    lastName,
    username,
    password,
    isAdmin
    FROM users where username='${username}'`;
    const users = await dal.execute(sql);
    return users;
}

async function addUser(user) {
    const sql = `insert into users(firstName, lastName, username, password, isAdmin)
    values('${user.firstName}', '${user.lastName}', 
    '${user.username}', '${user.password}', '${user.isAdmin}')`;
    const info = await dal.execute(sql);
    user.id = info.insertId;
    return user;
}

module.exports = {
    getAllUsers,
    getOneUser,
    addUser
};