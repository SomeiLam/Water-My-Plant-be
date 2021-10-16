exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
      users.timestamps(false, true)
    })
    .createTable('plants', (plants) => {
      plants.increments('plants_id')
      plants.string('nickname', 200).notNullable()
      plants.string('species', 200).notNullable()
      plants.string('h2oFrequency', 200).notNullable()
      plants.string('image', 2000)
      plants.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      plants.timestamps(false, true)
    })
}

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('plants')
    .dropTableIfExists('users')
}
