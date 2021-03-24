const request = require('supertest');
const app = require('../src/app');
const User = require('../src/db/schemas/User');

const user1 = {
    name : "user1",
    email : "user1@test.com",
    password : "CoDe123!haAhAa"
}

beforeEach(async ()=>{
    //clean the database
    await User.deleteMany();
    //add a user for testing
    await new User(user1).save();
});

test('Should signup a new user', async () =>{
    await request(app).post('/users').send({
        name : "testAris",
        email : "testAris@example.com",
        password : "HeHepassw!99"
    }).expect(201)
});

test('Should login an existing user', async() =>{
    await request(app).post('/users/login').send({
        email : user1.email,
        password : user1.password
    }).expect(200);
})

test('Should not login nonexistent user', async()=>{
    await request(app).post('/users/login').send({
        email : "wrongusername",
        password : "WhAtEVeR123!"
    }).expect(400);
})