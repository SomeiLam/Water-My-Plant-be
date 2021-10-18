const users = [
    {
        username: 'amy',
        password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq', // 1234
        phonenumber: '12345678'
    },
    {
        username: 'jujube',
        password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq', // 1234
        phonenumber: '23456789'
    }
]

const plants = [
    {
        nickname: 'Jelly',
        species: 'Aloe',
        h2oFrequency: 'every 3 weeks',
        image: 'https://image.shutterstock.com/image-photo/small-aloe-cactus-white-pot-600w-263617586.jpg',
        user_id: 1
    },
    {
        nickname: 'Greeen',
        species: 'Aloe',
        h2oFrequency: 'every 3 weeks',
        image: 'https://image.shutterstock.com/image-photo/aloe-vera-herb-that-can-600w-200104898.jpg',
        user_id: 2
    },
    {
        nickname: 'dotdot',
        species: 'Aloe',
        h2oFrequency: 'every 3 weeks',
        image: 'https://image.shutterstock.com/image-photo/aloe-albica-on-window-decorative-600w-500708329.jpg',
        user_id: 1
    }
]

exports.seed = async function (knex) {
    await knex('users').insert(users)
    await knex('plants').insert(plants)
}