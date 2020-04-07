const express = require("express");
const Movie = require("../models/Movie");
// const Celebrity = require("../models/Celebrity");

const router = express.Router();

// //////////////////////////////////////// GET the movies list
router.get("/movies", (req, res, next) => {
  Movie.find({})
    .then(allMovies => {
      res.render("movies", { movies: allMovies });
    })
    .catch(err => {
      next(err);
    });
});

// //////////////////////////////////////// GET the movies details
router.get("/movies/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .then(movie => {
      res.render("movie", movie);
    })
    .catch(err => {
      next(err);
    });
});

// //////////////////////////////////////// GET & POST New Film
router.get("/movie-add", (req, res, next) => {
  // // OverwriteModelError: Cannot overwrite `Celebrity` model once compiled.
  // Celebrity.find({ occupation: { $in: ["movie star", "singer"] } })
  //   .then(players => {
  //      res.render("movie-add", { players: players });
  //   })
  //   .catch(err => {
  //     next(err);
  //   });
  res.render("movie-add");
});

router.post("/movie-add", (req, res, next) => {
  const { title, genre, plot } = req.body;
  Movie.create({ title, genre, plot }, (err, movie) => {
    if (err) {
      console.log("There is an error: ", err);
    } else {
      console.log("Movie saved: ", movie.title);
      res.redirect("/movies");
    }
  });
});

// //////////////////////////////////////// GET Delete Movie
router.get("/movies/:id/delete", (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(() => {
      console.log("Nice! Movie deleted!!!");
      res.redirect("/movies");
    })
    .catch(err => {
      next(err);
    });
});

// //////////////////////////////////////// GET & POST Update Movie
router.get("/movies/:id/edit", (req, res, next) => {
  Movie.findById(req.params.id)
    .then(movie => {
      res.render("movie-edit", movie);
    })
    .catch(err => {
      next(err);
    });
});

router.post("/movies/:id/edit", (req, res, next) => {
  let { title, genre, plot } = req.body;

  Movie.findByIdAndUpdate(req.params.id, { title, genre, plot })
    .then(movie => {
      res.redirect(`/movies/${movie._id}`);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
