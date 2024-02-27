const request  = require('supertest');
const app = require('../app')

 const URL_GENRE ="/genres"
const genre = {
    name:"accion"
}
let genreId

test("POST -> '/URL_GENRE', should status code 201 , res.body to be defined and res.body.name= genre.name",async()=>{
     const res= await request(app)
     .post(URL_GENRE)
     .send(genre)
     genreId= res.body.id

   expect( res.status).toBe(201)
   expect(res.body).toBeDefined()
   expect(res.body.name).toBe(genre.name)  
})

test("GET -> '/URL_GENRE',should status code 200, res.body to be  defined and  res.body.length= 1", async () =>{

    const res= await request(app)
    .get(URL_GENRE)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET ONE ->'/URL_GENRE/:id',should return status code 200, res.body to be defined and res.body.name = genre.name",async()=>{
        const res=await request(app)
        .get(`${URL_GENRE}/${genreId}`)

        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe(genre.name)
    })

test("PUT -> '/URL_GENRE/:id', should return code 200, res.body to be defiend and res.body.name= send(`${text}`)", async()=>{

    const res=await request(app)
     .put(`${URL_GENRE}/${genreId}`)
     .send({name: "terror"})

     expect(res.statusCode).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.name).toBe("terror")
})

test("DELETE -> 'URL_GENRE/:id', should code 204",async()=>{

    const res=await request(app)
      .delete(`${URL_GENRE}/${genreId}`)
      expect(res.status).toBe(204)
    
    })