const app = require('./server'); 
const supertest = require('supertest');
const request = supertest(app);

it('Endpoint github users list from our api', async done=>{
    const resposta = await request.get('/api/users');
    expect(resposta.status).toBe(200); 
    done();
});

it('Endpoint user details from our api', async done=>{
    const resposta = await request.get('/api/users/:username/details');
    expect(resposta.status).toBe(200); 
    done();
});

it('Endpoint user github repos', async done=>{
    const resposta = await request.get('/api/users/:username/repos');
    expect(resposta.status).toBe(200); 
    done();
});