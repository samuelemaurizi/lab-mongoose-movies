const express = require("express");
const Celebrity = require("../models/celebrity");
const router = express.Router();

// //////////////////////////////////////// GET the celebrities list
router.get("/celebrities", (req, res, next) => {
  Celebrity.find({})
    .then(allCeleb => {
      // console.log(allCeleb);
      res.render("celebrities", { celebrities: allCeleb });
    })
    .catch(err => {
      next(err);
    });
});

// //////////////////////////////////////// Get Celebrity Details
router.get("/celebrities/:id", (req, res, next) => {
  const celebID = req.params.id;
  Celebrity.findById(celebID)
    .then(celeb => {
      res.render("celebrity", celeb);
    })
    .catch(err => {
      next(err);
    });
});

// //////////////////////////////////////// GET & POST New Celebrity
router.get("/celebrities-add", (req, res, next) => {
  res.render("celebrities-add");
});

router.post("/celebrities-add", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const newCelebrity = new Celebrity({ name, occupation, catchPhrase });
  newCelebrity
    .save()
    .then(allCeleb => {
      res.redirect("/celebrities");
    })
    .catch(err => {
      next(err);
    });
});

// //////////////////////////////////////// GET Delete Celebrity
router.get("/celebrities/:id/delete", (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(() => {
      console.log("Celebrities deleted!!!");
      res.redirect("/celebrities");
    })
    .catch(err => {
      next(err);
    });
});

// //////////////////////////////////////// GET & POST Update Celebrity
router.get("/celebrities/:id/update", (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => {
      console.log("Ready to update --> ", celebrity);
      res.render("celebrities-edit", celebrity);
    })
    .catch(err => {
      next(err);
    });
});

router.post("/celebrities/:id/update", (req, res, next) => {
  let { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(req.params.id, { name, occupation, catchPhrase })
    .then(celebrity => {
      res.redirect(`/celebrities/${celebrity._id}`);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
