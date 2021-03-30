const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/db/schemas/Task');
const {
    user1Id,
    user1,
    populateDatabase,
    user2Id,
    user2,
    task1,task2,task3
} = require('./fixtures/db');

beforeEach(populateDatabase);

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({
            description: 'sample description from test'
        }).expect(201);

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
    //match descriptions
    expect(task.description).toBe('sample description from test');
    //check if the correct user created the task
    expect(task.owner).toEqual(user1Id);

});

test('Should tasks for user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200);
    //check the length of the returning array
    expect(response.body).toHaveLength(2);
});

test('Should not be able to delete onothers users task' , async()=>{
    const response = await request(app)
        .delete(`/tasks/${task1._id}`)
        .set('Authorization', `Bearer ${user2.tokens[0].token}`)
        .send()
        .expect(404);
    const task = await Task.findById(task1._id);
    expect(task).not.toBeNull();
});

