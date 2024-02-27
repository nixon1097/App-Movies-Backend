const request = require('supertest')
const  app = require('../app')

const URL_DIRECTOR = '/directors'

const director={
    firstName:"John",
    lastName: "Doe",
    nationality: 'British',
    image: "https://image.tmdb.org/t/p/w500//8u6g4O7qc9ySifjHMvEZl31RGdI.jpg" ,
    birthday:"2002-03-29"
}
let directorId


test("POST -> '/URL_DIRECTOR', should status code 201 , res.body to be defined and res.body.firstName = DIRECTOR.firstName ",async()=>{
    const res= await request(app)
    .post(URL_DIRECTOR)
    .send(director)
    directorId = res.body.id;

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName);
})

test("GET ALL -> '/URL_DIRECTOR',should status code 200, res.body to be defined and res.body.firstName=director.firstName", async () => {
     const res= await  request(app)
     .get(URL_DIRECTOR)
     
     expect(res.statusCode).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.length).toBe(1)
    })
test("GET ONE-> '/URL_DIRECTOR/:id',should status code 200, res.body to be defined and res.body.firstName=director.firstName", async () => {
     const res= await  request(app)
     .get(`${URL_DIRECTOR}/${directorId}`)
     
     expect(res.statusCode).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.firstName).toBe(director.firstName)
    })

test("Put -> '/URL_DIRECTOR/:id',should status code 200 , res.body to be defined and res.body.firstName = send('text')",async()=>{

    const res= await request(app)
     .put(`${URL_DIRECTOR}/${directorId}`)
     .send({firstName:"Carlos"})

     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.firstName).toBe("Carlos")

})

test("DELETE -> '/URL_DIRECTOR/:id', should code 204",async()=>{
    const res=await request(app)
    .delete(`${URL_DIRECTOR}/${directorId}`)

    expect(res.status).toBe(204)
})