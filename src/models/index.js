const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

// table pivot : movieGenre
Genre.belongsToMany(Movie, { through: 'movieGenre'});
Movie.belongsToMany(Genre, { through: 'movieGenre'});

//table pivot: movieDirector
Director.belongsToMany(Movie,{through:'movieDirector'})
Movie.belongsToMany(Director,{through:'movieDirector'})

//table pivot: movieDirector
Actor.belongsToMany(Movie,{through:'movieActor'})
Movie.belongsToMany(Actor,{through:'movieActor'})


