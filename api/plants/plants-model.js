const db = require('../data/db-config');

function getPlantsByUserId(id) {
    return db('plants')
        .where('user_id', id)
}

function getPlantById(user_id, plants_id) {
    return db('plants')
        .where({ 'user_id': user_id, 'plants_id': plants_id })
        .first()
}

async function addPlant(plant) {
    const [id] = await db('plants').insert(plant, ['plants_id', 'user_id'])
    return getPlantById(id.user_id, id.plants_id)
}

async function updatePlant(user_id, plants_id, plant) {
    await db('plants')
        .where({ 'user_id': user_id, 'plants_id': plants_id })
        .update(plant)
    return getPlantById(user_id, plants_id)
}

async function deletePlant(user_id, plants_id) {
    await db('plants')
        .where({ 'user_id': user_id, 'plants_id': plants_id })
        .del()
    return getPlantsByUserId(user_id)
}

module.exports = {
    getPlantsByUserId,
    getPlantById,
    addPlant,
    updatePlant,
    deletePlant
}