# Water My Plants API

## Base URL
```
https://watermyplantsweb46.herokuapp.com
```


## Authentication

### Login
```
[POST] /auth/login
```
Parameters:
```
{
    username: [USERNAME],
    password: [PASSWORD],
    phonenumber: [PHONENUMBER]
}
```
Return:
```
{
    message: "welcome, amy",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImFteSIsInBhc3N3b3JkIjoiJDJhJDA4JC5DRUdseGM5eHlWZm5Ydk93QWkwTGU3emc4NXMzVm01Ymg2Ty5SM3dRY3gzMEp3V1RDRE9PIiwiaWF0IjoxNjM0NTAyNzY1LCJleHAiOjE2MzQ1ODkxNjV9.D6MgNKKjwNeXYR0h3b1K5bulDXEQyPCNpiO-d-9pqAY"
}
```
Errors:
```
{
    "message": "username, password and phone number are required"
}
```
```
{
    "message": "Invalid credentials"
}
```

### Register
```
[POST] /auth/register
```
Parameters:
```
{
    username: [USERNAME],
    password: [PASSWORD],
    phonenumber: [PHONENUMBER]
}
```
Return:
```
{
    user_id: 1,
    username: amy,
    password: "$2a$08$0AJSweO0/q.gPO1zHGUH0.hIkA5D..r2Op3ipP84Oswh5pv/UnOhy"
}
```
Errors:
```
{
    "message": "username, password and phone number are required"
}
```
```
{
    "message": "username taken"
}
```

## Users Data Access
### Get all users
```
[GET] /users
```
Headers:
```
authorization: [TOKEN]
```
Return:
```
[
    {
        "user_id": 1,
        "username": "amy",
        "password": "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq", // 1234
        "phonenumber": "12345678",
        "created_at": "2021-10-18T17:01:19.774Z",
        "updated_at": "2021-10-18T17:01:19.774Z"
    },
    {
        "user_id": 2,
        "username": "jujube",
        "password": "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq", // 1234
        "phonenumber": "23456789",
        "created_at": "2021-10-18T17:01:19.774Z",
        "updated_at": "2021-10-18T17:01:19.774Z"
    },
    {
        "user_id": 3,
        "username": "brownie",
        "password": "$2a$08$jWgDw19Zl8XQiFY/XPjFiehF0ClOwBk/iMHAFrz153rt137.BWzLm", // 1234
        "phonenumber": "11111111",
        "created_at": "2021-10-18T17:09:18.955Z",
        "updated_at": "2021-10-18T17:09:18.955Z"
    }
]
```
Errors:
```
{
    "message": "token invalid"
}
```
```
{
    "message": "token required"
}
```
### Remove user
```
[DELETE] /users/:id
```
Return:
```
"user_id 1 has been removed"
```
Errors:
```
{
    "message": "token invalid"
}
```
```
{
    "message": "token required"
}
```
## Plants Data Access

### Get all plants
```
[GET] /plants
```
Headers:
```
authorization: [TOKEN]
```
Return:
```
[
    {
        "plants_id": 1,
        "nickname": "Aloe Vera",
        "species": "Aloe",
        "h2oFrequency": "every 3 weeks",
        "image": "https://freecgaxisimg.ams3.cdn.digitaloceanspaces.com/2014/11/cgaxis_models_21_20b.jpg",
        "user_id": 1
    },
    {
        "plants_id": 3,
        "nickname": "Aloe Vera3",
        "species": "Aloe3",
        "h2oFrequency": "every 3 weeks",
        "image": "https://freecgaxisimg.ams3.cdn.digitaloceanspaces.com/2014/11/cgaxis_models_21_20b.jpg",
        "user_id": 1
    }
]
```
Errors:
```
{
    "message": "token invalid"
}
```
```
{
    "message": "token required"
}
```
### Get plant by plants_id
```
[GET] /plants/:id
```
Headers:
```
authorization: [TOKEN]
```
Return:
```
{
    "plants_id": 1,
    "nickname": "Aloe Vera",
    "species": "Aloe",
    "h2oFrequency": "every 3 weeks",
    "image": "https://freecgaxisimg.ams3.cdn.digitaloceanspaces.com/2014/11/cgaxis_models_21_20b.jpg",
    "user_id": 1
}
```
Errors:
```
{
    "message": "token invalid"
}
```
```
{
    "message": "token required"
}
```
### Add a plant
```
[POST] /plants
```
Headers:
```
authorization: [TOKEN]
```
Parameters:
```
{
    "nickname": "Happy",
    "species": "Aloe",
    "h2oFrequency": "every 3 weeks",
    "image": "https://freecgaxisimg.ams3.cdn.digitaloceanspaces.com/2014/11/cgaxis_models_21_20b.jpg"
}
```
Return:
```
{
    "plants_id": 4,
    "nickname": "Happy",
    "species": "Aloe",
    "h2oFrequency": "every 3 weeks",
    "image": "https://freecgaxisimg.ams3.cdn.digitaloceanspaces.com/2014/11/cgaxis_models_21_20b.jpg",
    "user_id": 1
}
```
Errors:
```
{
    "message": "token invalid"
}
```
```
{
    "message": "token required"
}
```
```
{
    "message": "nickname must be provided as a string"
}
```
```
{
    "message": "species must be provided as a string"
}
```
```
{
    "message": "h2oFrequency must be provided as a string"
}
```

### Edit a plant by plants_id
```
[PUT] /plants/:id
```
Headers:
```
authorization: [TOKEN]
```
Parameters:
```
{
    "nickname": "Happy",
    "species": "Aloe",
    "h2oFrequency": "every 3 weeks",
    "image": "https://freecgaxisimg.ams3.cdn.digitaloceanspaces.com/2014/11/cgaxis_models_21_20b.jpg"
}
```
Return:
```
{
    "plants_id": 4,
    "nickname": "Greeeeen",
    "species": "Aloe",
    "h2oFrequency": "every 3 weeks",
    "image": "https://freecgaxisimg.ams3.cdn.digitaloceanspaces.com/2014/11/cgaxis_models_21_20b.jpg",
    "user_id": 1
}
```
Errors:
```
{
    "message": "token invalid"
}
```
```
{
    "message": "token required"
}
```
```
{
    "message": "nickname must be provided as a string"
}
```
```
{
    "message": "species must be provided as a string"
}
```
```
{
    "message": "h2oFrequency must be provided as a string"
}
```
### Remove a plant by plants_id
```
[DELETE] /plants/:id
```
Headers:
```
authorization: [TOKEN]
```
Return:
```
[
    {
        "plants_id": 1,
        "nickname": "Aloe Vera",
        "species": "Aloe",
        "h2oFrequency": "every 3 weeks",
        "image": "https://freecgaxisimg.ams3.cdn.digitaloceanspaces.com/2014/11/cgaxis_models_21_20b.jpg",
        "user_id": 1
    },
    {
        "plants_id": 3,
        "nickname": "Aloe Vera3",
        "species": "Aloe3",
        "h2oFrequency": "every 3 weeks",
        "image": "https://freecgaxisimg.ams3.cdn.digitaloceanspaces.com/2014/11/cgaxis_models_21_20b.jpg",
        "user_id": 1
    }
]
```
Errors:
```
{
    "message": "token invalid"
}
```
```
{
    "message": "token required"
}
```
