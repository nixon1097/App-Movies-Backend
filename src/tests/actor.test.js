const  request = require('supertest');
const app = require('../app');

const URL_ACTOR= '/actors';
const actor ={
    firstName:"jorge",
    lastName:"castro",
    nationality: "Mexican",
    image: 'https://i.pinimg.com/736x/1c/82/0f/1c820ff5e4d9bddaadfdbbbf494cd3da--actor-jose-gallardo.jpg',
    birthday:"1997-12-10"
}
 let actorId

test("POST -> '/URL_ACTOR', should status code 201 , res.body to be defined and res.body.name = actor.name ",async()=>{
    const res= await request(app)
    .post(URL_ACTOR)
    .send(actor)
    actorId = res.body.id;

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName);
})

test("GET ALL -> '/URL_ACTOR',should status code 200, res.body to be defined and res.body.firstName=actor.firstName", async () => {
     const res= await  request(app)
     .get(URL_ACTOR)
     
     expect(res.statusCode).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.length).toBe(1)
    })
test("GET ONE-> '/URL_ACTOR/:id',should status code 200, res.body to be defined and res.body.firstName=actor.firstName", async () => {
     const res= await  request(app)
     .get(`${URL_ACTOR}/${actorId}`)
     
     expect(res.statusCode).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.firstName).toBe(actor.firstName)
    })

test("Put -> '/URL_ACTOR/:id',should status code 200 , res.body to be defined and res.body.firstName = send('text')",async()=>{

    const res= await request(app)
     .put(`${URL_ACTOR}/${actorId}`)
     .send({firstName:"Carlos"})

     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.firstName).toBe("Carlos")

})

test("DELETE -> '/URL_ACTOR/:id', should code 204",async()=>{
    const res=await request(app)
    .delete(`${URL_ACTOR}/${actorId}`)

    expect(res.status).toBe(204)
})