const db = require('../data/db-config');

function getUsers() {
    return db("users")
}

function findBy(filter) {
    return db('users')
        .where(filter)
}

function findById(id) {
    return db('users')
        .where('id', id)
        .first()
}

function removeUser(id) {
    return db('users')
        .where('id', id)
        .del()
}

async function add(user) {
    const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
    return newUserObject
}

module.exports = {
    getUsers,
    findBy,
    findById,
    add,
    removeUser
};
