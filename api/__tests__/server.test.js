const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

describe('[POST] api/auth/register', () => {
  it('responds with 201 CREATED if succeed', async () => {
    const res = await request(server).post('/api/auth/register').send({ username: 'lolita', password: '1234' })
    expect(res.status).toBe(201)
  })
  it('responds with 422 error and correct message if password is missed', async () => {
    const res = await request(server).post('/api/auth/register').send({ username: 'jujube' })
    expect(res.status).toBe(422)
    expect(res.body).toMatchObject({ message: 'username and password required' })
  })
})

describe('[POST] api/auth/login', () => {
  it('responds with 200 OK and a token if succeed', async () => {
    const res = await request(server).post('/api/auth/login').send({ username: 'jujube', password: '1234' })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
  })
  it('responds with 401 and error message if username does not existed', async () => {
    const res = await request(server).post('/api/auth/login').send({ username: 'brownie', password: '1234' })
    expect(res.status).toBe(401)
    expect(res.body).toMatchObject({ message: 'Invalid credentials' })
  })
})

describe('[GET] api/users', () => {
  it('responds with 200 OK and a plants list with a correct headers', async () => {
    const res = await request(server).post('/api/auth/login').send({ username: 'amy', password: '1234' })
    const users = await request(server).get('/api/users').set('Authorization', res.body.token)
    expect(users.body).toHaveLength(2)
  })
  it('responds with 401 if token is not sent', async () => {
    const res = await request(server).get('/api/plants')
    expect(res.status).toBe(401)
  })
})

describe('[DELETE] api/users/:id', () => {
  it('responds with 200 OK with a correct headers', async () => {
    const res = await request(server).post('/api/auth/login').send({ username: 'amy', password: '1234' })
    const body = await request(server).delete('/api/users/1').set('Authorization', res.body.token)
    expect(res.status).toBe(200)
    expect(body.text).toMatch(/has been removed/i)
  })
})

describe('[GET] api/plants', () => {
  let user
  let res
  beforeEach(async () => {
    user = await request(server).post('/api/auth/login').send({ username: 'amy', password: '1234' })
    res = await request(server).get('/api/plants').set('Authorization', user.body.token)
  })
  it('responds with 200 OK and a plants list with a correct headers', () => {
    expect(res.status).toBe(200)
  })
  it('responds with a plants list', () => {
    expect(Array.isArray(res.body)).toBeTruthy();
  })
})

describe('[GET] api/plants/:id', () => {
  let user
  let res
  beforeEach(async () => {
    user = await request(server).post('/api/auth/login').send({ username: 'amy', password: '1234' })
    res = await request(server).get('/api/plants/1').set('Authorization', user.body.token)
  })
  it('responds with 200 OK and a plants list with a correct headers', () => {
    expect(res.status).toBe(200)
  })
  it('respond with one plant', () => {
    expect(res.body).toMatchObject({
      "plants_id": 1,
      "nickname": "Aloe Vera",
      "species": "Aloe",
      "h2oFrequency": "every 3 weeks",
      "image": "https://freecgaxisimg.ams3.cdn.digitaloceanspaces.com/2014/11/cgaxis_models_21_20b.jpg",
      "user_id": 1
    })
  })
  it('responds with error if the plants_id is not correct', async () => {
    const res = await request(server).get('/api/plants/2').set('Authorization', user.body.token)
    expect(res.status).toBe(401)
  })
})

describe('[POST] api/plants', () => {
  let user
  let beforeAdded
  let res
  beforeEach(async () => {
    user = await request(server).post('/api/auth/login').send({ username: 'amy', password: '1234' })
    beforeAdded = await db('plants')
    res = await request(server).post('/api/plants').set('Authorization', user.body.token).send({ nickname: 'greeeen', species: 'Aloe', h2oFrequency: 'every 3 weeks' })
  })
  it('responds with 201 CREATED', async () => {
    expect(res.status).toBe(201)
  })
  it('causes a plant to be added to the db', async () => {
    const afterAdded = await db('plants')
    expect(beforeAdded.length).toBeLessThan(afterAdded.length)
  })
})

describe('[PUT] api/plants/:id', () => {
  let user
  let beforeEdited
  let res
  beforeEach(async () => {
    user = await request(server).post('/api/auth/login').send({ username: 'amy', password: '1234' })
    beforeEdited = await db('plants').where('plants_id', 1).first()
    res = await request(server).put('/api/plants/1').set('Authorization', user.body.token).send({ nickname: 'greeeen', species: 'Aloe', h2oFrequency: 'every 3 weeks' })
  })
  it('responds with 200 OK', async () => {
    expect(res.status).toBe(200)
  })
  it('causes a plant to be updated to the db', async () => {
    const AfterEdited = await db('plants').where('plants_id', 1).first()
    expect(AfterEdited).not.toEqual(beforeEdited)
    expect(AfterEdited).toMatchObject({ nickname: 'greeeen', species: 'Aloe', h2oFrequency: 'every 3 weeks' })
  })
})

describe('[DELETE] /api/plants/:id', () => {
  let user
  let beforeRemoved
  let res
  beforeEach(async () => {
    user = await request(server).post('/api/auth/login').send({ username: 'amy', password: '1234' })
    beforeRemoved = await db('plants')
    res = await request(server).delete('/api/plants/1').set('Authorization', user.body.token)
  })
  it('responds with 200 OK', () => {
    expect(res.status).toBe(200)
  })
  it('causes a plant to be removed from the db', async () => {
    const afterRemoved = await db('plants')
    expect(afterRemoved.length).toBeLessThan(beforeRemoved.length)
  })
})