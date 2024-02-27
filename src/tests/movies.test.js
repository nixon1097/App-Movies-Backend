require('../models')
const request = require('supertest')
const  app = require('../app')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')

const URL_MOVIE = '/movies'

const movie ={
    name: "El Padrino",
    image: "https://m.media-amazon.com/images/M/MV5BNzQyOTU1MTY3NF5BMl5BanBnXkFtZTgwMDU2NTI4ODE@._V1_SX300.jpg",
    synopsis:"loremeiisa20202",
    releaseYear:"1973-07-26"
}
let movieId 

test("POST -> '/URL_MOVIE',should return satusCode 201, res.body to be Defined and res.body.name= movie.name",async()=>{
     const res = await request(app)
     .post(URL_MOVIE)
     .send(movie)
     movieId= res.body.id
     expect(res.status).toBe(201)     
     expect(res.body).toBeDefined()
      expect(res.body.name).toBe(movie.name)
     
})

test("GET ALL -> '/URL_MOVIE', should return statusCode 200, res.body to be Defined and res.body.length= 1",async()=>{
    const res=await request(app)
    .get(URL_MOVIE)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})
test("GET ONE-> '/URL_MOVIE/:id', should return statusCode 200, res.body to be Defined and res.body.name= movies.name",async()=>{
    
    const res=await request(app)
    .get(`${URL_MOVIE}/${movieId}`)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})
test("PUT -> '/URL_MOVIE/:id', should return statusCode 200, res.body to be Defined and res.body.name= send('text')",async()=>{

    const res=await request(app)
    .put(`${URL_MOVIE}/${movieId}`)
    .send({name:'X-MEN'})
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("X-MEN")
})
test("POST -> '/URL_MOVIE/:id/actors', should return statusCode 200, res.body to be Defined ",async()=>{
    const  actor= await Actor.create({
        firstName:"Tom",
        lastName:"Cruise",
        nationality:"American",
        image: "https://image.tmdb.org/t/p/w5336" + "9YxJRPqKlLjHG8Dg7WQhZFu4UbkTfIrEeoNvzOcBn.jpg",
        birthday: "1985-03-12"
    })
    

    const res=await request(app)
    .post(`${URL_MOVIE}/${movieId}/actors`)
    .send([actor.id])
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(actor.id)

    await  actor.destroy()
})
test("POST -> '/URL_MOVIE/:id/genres', should return statusCode 200, res.body to be Defined ",async()=>{
    const  genre= await Genre.create({
       name:"Super Hero"
       
    })
    

    const res=await request(app)
    .post(`${URL_MOVIE}/${movieId}/genres`)
    .send([genre.id])
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(genre.id)

    await  genre.destroy()
})
test("POST -> '/URL_MOVIE/:id/directors', should return statusCode 200, res.body to be Defined ",async()=>{
    const  director= await Director.create({
        firstName:"Tom",
        lastName:"Cruise",
        nationality:"American",
        image: "https://image.tmdb.org/t/p/w5336" + "9YxJRPqKlLjHG8Dg7WQhZFu4UbkTfIrEeoNvzOcBn.jpg",
        birthday: "1985-03-12"
    })
    

    const res=await request(app)
    .post(`${URL_MOVIE}/${movieId}/directors`)
    .send([director.id])
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(director.id)

    await  director.destroy()
})

test("DELETE -> '/URL_MOVIE/:id', should code 204",async()=>{
    const res=await request(app)
    .delete(`${URL_MOVIE}/${movieId}`)

    expect(res.status).toBe(204)
})
