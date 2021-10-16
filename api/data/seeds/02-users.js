const users = [
    {
        username: 'amy',
        password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq', // 1234
    },
    {
        username: 'jujube',
        password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq', // 1234
    }
]

const plants = [
    {
        nickname: 'Aloe Vera',
        species: 'Aloe',
        h2oFrequency: 'every 3 weeks',
        image: 'https://freecgaxisimg.ams3.cdn.digitaloceanspaces.com/2014/11/cgaxis_models_21_20b.jpg',
        user_id: 1
    },
    {
        nickname: 'Aloe Vera2',
        species: 'Aloe2',
        h2oFrequency: 'every 3 weeks',
        image: 'https://freecgaxisimg.ams3.cdn.digitaloceanspaces.com/2014/11/cgaxis_models_21_20b.jpg',
        user_id: 2
    },
    {
        nickname: 'Aloe Vera3',
        species: 'Aloe3',
        h2oFrequency: 'every 3 weeks',
        image: 'https://freecgaxisimg.ams3.cdn.digitaloceanspaces.com/2014/11/cgaxis_models_21_20b.jpg',
        user_id: 1
    }
]

exports.seed = async function (knex) {
    await knex('users').insert(users)
    await knex('plants').insert(plants)
}